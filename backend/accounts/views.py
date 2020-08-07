from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .models import FriendRequest, Product, TimeSetting, Sensing
from .serializers import UserSerializer, UserListSerializer, FriendRequestSenderListSerializer, TimeSettingSerializer
from .helper import email_auth_num

from django.db.models import Count, Sum
from datetime import date, timedelta

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list(request):
    kw = request.GET.get('kw')
    users = User.objects.filter(email__icontains=kw) if kw else User.objects.all()
    serializer = UserListSerializer(users, many=True)
    return Response({"status": "OK", "data": serializer.data})


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def detail_or_delete_or_update(request, user_id):
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user)

    # 조회
    if request.method == 'GET':
        if user.sensing:
            startdate = date.today()
            posture = {}
            for i in range(0,8):
                day = startdate - timedelta(days=i)
                cnt = Sensing.objects.filter(user=user).filter(created_at=day).count()
                if cnt:
                    avg = Sensing.objects.filter(user=user).filter(created_at=day).aggregate(Sum('posture_level'))['posture_level__sum']/cnt
                    posture[str(day)] = round(avg,2)
                else:
                    posture[str(day)] = 0
        return Response({"status": "OK", "data": {**serializer.data, "posture": posture}})

    # 삭제
    if request.method == 'DELETE':
        if request.user == user:
            request.user.delete()
            return Response({"status": "OK", "data": serializer.data})
        else:
            return Response({"status": "FAIL", "error_msg": "삭제 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

    # 수정
    else:
        if request.user == user:
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({"status": "OK", "data": serializer.data})
        else:
            return Response({"status": "FAIL", "error_msg": "수정 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def key_certification(request, product_key):
    # db에 제품키 있는지 확인
    p = Product.objects.filter(product_key=product_key)
    if p.exists():
        # 해당 제품키 사용하고 있는 유저가 있는지 확인
        p = Product.objects.get(product_key=product_key)
        if p.user:
            success = False
            msg = '해당 제품키는 이미 사용 중입니다.'
        else:
            # 성공
            success = True
            msg = '해당 제품키는 사용하실 수 있습니다.'
    else:
        success = False
        msg = '존재하지 않는 제품키입니다.'
    data = {
        "success": success,
        "msg": msg,
    }
    return Response({"status": "OK", "data": data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def key_registration(request, product_key):
    p = get_object_or_404(Product, product_key=product_key)
    # 키 등록
    if not p.user:
        # 이미 등록된 제품키가 있는데, 바꾸려는 경우 기존 키의 유저 제거
        if hasattr(request.user, 'product'):
            before_p = request.user.product
            before_p.user = None
            before_p.save()
        p.user = request.user
        p.save()
        return Response({"status": "OK", "msg": "제품 키 등록에 성공하였습니다."})
    return Response({"status": "FAIL", "error_msg": "제품 키 등록에 실패하였습니다."}, status=status.HTTP_409_CONFLICT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friends_list(request):
    user = request.user
    friends = user.friends.all()
    res = {'friends':[]}
    for friend in friends:
        res['friends'].append(UserSerializer(friend).data)
    return Response({"status": "OK", "data": res})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests_list(request):
    user = request.user
    friend_requests = FriendRequest.objects.filter(receiver=user)
    serializer = FriendRequestSenderListSerializer(friend_requests, many=True)
    return Response({"status": "OK", "data": serializer.data})

@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])
def friend_add_or_delete(request, user_id): 
    sender = request.user
    receiver = get_object_or_404(User,id=user_id)
    if request.method == 'POST': # 친구 신청 / 신청취소
        if receiver in sender.friends.all(): 
            return Response({"status": "FAIL", "msg": "이미 친구 등록된 유저입니다."}, status=status.HTTP_409_CONFLICT)
        try:
            request = FriendRequest.objects.get(sender=sender, receiver=receiver)
            request.delete()
            res = "DELETE"
        except FriendRequest.DoesNotExist:
            FriendRequest.objects.create(
                sender=sender,
                receiver=receiver
            )
            res = "ADD"
        data = {
            "status": res
        }
        return Response({"status": "OK", "data": data})
    else: # DELETE 친구 삭제
        receiver.friends.remove(sender)
        return Response({"status": "OK", "msg": "친구를 삭제하였습니다."})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def friend_accept(request,user_id):
    receiver = request.user
    sender = get_object_or_404(User,id=user_id)
    request = get_object_or_404(FriendRequest, sender=sender, receiver=receiver)
    receiver.friends.add(sender)
    request.delete()
    return Response({"status": "OK", "msg": "친구 요청을 수락하였습니다."})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def friend_reject(request,user_id):
    receiver = request.user
    sender = get_object_or_404(User,id=user_id)
    request = get_object_or_404(FriendRequest, sender=sender, receiver=receiver)
    request.delete()
    return Response({"status": "OK", "msg": "친구 요청을 거절하였습니다."})

@api_view(['POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def timesetting_create_or_delete_or_update(request):
    if request.method == 'POST':
        serializer = TimeSettingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            time_setting = serializer.save()
            request.user.time_setting=time_setting
            request.user.save()        
            return Response(TimeSettingSerializer(time_setting).data)
    elif request.method == 'DELETE':
        time_setting = request.user.time_setting
        if time_setting:
            time_setting.delete()
            return Response({"status": "OK", "msg": "삭제가 완료되었습니다."})
        else:
            return Response({"status": "FAIL", "msg": "time_setting이 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
    else: # PUT update
        time_setting = request.user.time_setting
        serializer = TimeSettingSerializer(time_setting,data=request.data,partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"status": "OK", "data": serializer.data})
    
@api_view(['GET'])
def email_find(request, product_key):
    product = get_object_or_404(Product, product_key=product_key)
    if product.user:
        res = {'email': product.user.email}
        return Response({"status": "OK", "data": res})
    else:
        return Response({"status": "FAIL", "msg": "해당 제품키를 등록한 유저가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def main_info(request):
    if Sensing.objects.filter(user=request.user).order_by('-pk'):
        info = Sensing.objects.filter(user=request.user).order_by('-pk')[0]
        data = {
            'posture_level': info.posture_level,
            'temperature': info.temperature,
            'humidity': info.humidity,
        }
    else: # 센싱 값 없는 경우
        data = {
            'posture_level': 0,
            'temperature': 0,
            'humidity': 0,
        }
    return Response({"status": "OK", "data": data})

@api_view(['GET'])
def initial_info(request):
    product_key = request.GET.get('product_key')
    p = get_object_or_404(Product, product_key=product_key)
    if p.user.time_setting:
        data = {
            'desired_humidity': p.user.desired_humidity,
            'auto_setting': p.user.auto_setting,
            'total_time': p.user.time_setting.total_time,
            'work_time': p.user.time_setting.work_time,
            'break_time': p.user.time_setting.break_time,
        }
    else:
        data = {
            'desired_humidity': p.user.desired_humidity,
            'auto_setting': p.user.auto_setting,
            'total_time': None,
            'work_time': None,
            'break_time': None,
        }
    return Response({"status": "OK", "data": data})

@api_view(['POST'])
def sensing_save(request):
    product_key = request.data.get('product_key')
    posture_level = request.data.get('posture_level')
    temperature = request.data.get('temperature')
    humidity = request.data.get('humidity')

    p = get_object_or_404(Product, product_key=product_key)
    Sensing.objects.create(user=p.user, posture_level=posture_level, temperature=temperature, humidity=humidity)
    return Response({"status": "OK"})