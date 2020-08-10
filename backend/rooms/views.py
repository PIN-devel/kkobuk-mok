from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Room
from .serializers import RoomSerializer, RoomListSerializer

from accounts.serializers import UserListSerializer
from accounts.models import Sensing

from django.db.models import Sum
from datetime import date, timedelta, datetime, time

PER_PAGE = 6

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_or_create(request):
    if request.method == 'GET':
        keyword = request.GET.get('keyword')
        p = request.GET.get('_page', 1)
        rooms = Paginator(Room.objects.filter(name__contains=keyword).order_by('-pk'), PER_PAGE)
        serializer = RoomListSerializer(rooms.page(p), many=True)
        return Response({"status": "OK", "data": serializer.data})
    else:
        # 생성 시 참여하고 있는 방 있으면 안됨
        if request.user.room:
            return Response({"status": "FAIL", "error_msg": "참여 중인 방이 있습니다."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            room = serializer.save()
            request.user.room = room  # 생성 시 방 참여자에 등록
            request.user.save()
            return Response({"status": "OK", "data": serializer.data})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def detail_or_in_or_out(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    serializer = RoomSerializer(room)
    if request.method == 'GET':
        if request.user.room == room: # 참여 중인 방 정보만 가져올 수 있음
            members = room.members.all()
            res = {'members':[]}
            for member in members:
                posture = []
                if member.sensing.all():
                    # 오늘 통계 (방 생성 후 조건도 포함)
                    today = date.today()
                    cnt = Sensing.objects.filter(user=member).filter(created_at__gte=datetime.combine(today, time.min)).filter(created_at__gte=room.created_at).count()
                    if cnt:
                        avg = Sensing.objects.filter(user=member).filter(created_at__gte=datetime.combine(today, time.min)).filter(created_at__gte=room.created_at).aggregate(Sum('posture_level'))['posture_level__sum']/cnt
                        posture.append(round(avg,2))
                    else:
                        posture.append(0)
                    # 방 생성 후 총 통계
                    cnt = Sensing.objects.filter(user=member).filter(created_at__gte=room.created_at).count()
                    if cnt:
                        avg = Sensing.objects.filter(user=member).filter(created_at__gte=room.created_at).aggregate(Sum('posture_level'))['posture_level__sum']/cnt
                        posture.append(round(avg,2))
                    else:
                        posture.append(0)                    
                else:
                    posture = [0, 0]
                res['members'].append({**UserListSerializer(member).data, "posture":posture})
            return Response({"status": "OK", "data": {**serializer.data, **res}})

        else:
            return Response({"status": "FAIL", "error_msg": "참여 멤버가 아닙니다."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        if room.members.filter(id=request.user.id).exists():
            request.user.room = None
            request.user.save()
            room.member_num -= 1
            room.save()
            # 방 참여자 없을 시 방 삭제
            if room.member_num == 0:
                room.delete()
        else:
            request.user.room = room
            request.user.save()
            room.member_num += 1
            room.save()
        return Response({"status": "OK", "data": serializer.data})

