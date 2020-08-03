from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Room
from .serializers import RoomSerializer, RoomListSerializer

PER_PAGE = 10

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_or_create(request):
    if request.method == 'GET':
        p = request.GET.get('_page', 1)
        rooms = Paginator(Room.objects.order_by('-pk'), PER_PAGE)
        serializer = RoomListSerializer(rooms.page(p), many=True)
        return Response({"status": "OK", "data": serializer.data})
    else:
        # 생성 시 참여하고 있는 방 있으면 안됨
        if request.user.room:
            return Response({"status": "FAIL", "error_msg": "참여 중인 방이 있습니다."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = RoomListSerializer(data=request.data)
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
            return Response({"status": "OK", "data": serializer.data})
        else:
            return Response({"status": "FAIL", "error_msg": "참여 멤버가 아닙니다."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        if room.members.filter(id=request.user.id).exists():
            request.user.room = None
            request.user.save()
            # 방 참여자 없을 시 방 삭제
            if room.members.count() == 0:
                room.delete()
        else:
            request.user.room = room
            request.user.save()
        return Response({"status": "OK", "data": serializer.data})