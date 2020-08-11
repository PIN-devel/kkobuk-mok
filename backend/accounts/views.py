from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .models import FriendRequest, Product, TimeSetting, Sensing
from .serializers import UserSerializer, UserListSerializer, FriendRequestSenderListSerializer, TimeSettingSerializer, FriendRequestReceiverListSerializer
from .helper import email_auth_num

from django.db.models import Sum
from datetime import date, timedelta, datetime, time, timezone

User = get_user_model()

def user_state_check(ing, total, work, rest):
    if total != 0 and ing >= total:
        return 1
    else:
        if ing > work+rest:
            return user_state_check(ing-(work+rest), total, work, rest)
        elif ing == work+rest:
            return 2
        else:
            if ing < work:
                return 2
            return 3

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list(request):
    kw = request.GET.get('kw')
    users = User.objects.filter(name__icontains=kw) if kw else User.objects.all()
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
            posture = []
            for i in range(0,8):
                p = {}
                day = startdate - timedelta(days=i)
                cnt = Sensing.objects.filter(user=user).filter(created_at__contains=day).count()
                if cnt:
                    avg = Sensing.objects.filter(user=user).filter(created_at__contains=day).aggregate(Sum('posture_level'))['posture_level__sum']/cnt
                    p["name"] = str(day)[5:]
                    p["score"] = round(avg,2)
                else:
                    p["name"] = str(day)[5:]
                    p["score"] = 0
                posture.append(p)
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

@api_view(['POST'])
def key_certification(request):
    product_key = request.data.get('product_key')
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
def key_registration(request):
    product_key = request.data.get('product_key')
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
        posture = []
        if friend.sensing.all():
            startdate = date.today()
            for i in [0, 7]:
                day = startdate - timedelta(days=i)
                cnt = Sensing.objects.filter(user=friend).filter(created_at__gte=datetime.combine(day, time.min)).count()
                if cnt:
                    avg = Sensing.objects.filter(user=friend).filter(created_at__gte=datetime.combine(day, time.min)).aggregate(Sum('posture_level'))['posture_level__sum']/cnt
                    posture.append(round(avg,2))
                else:
                    posture.append(0)
        else:
            posture = [0, 0]
        res['friends'].append({**UserListSerializer(friend).data, "posture":posture})
    return Response({"status": "OK", "data": res})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests_receive_list(request):
    user = request.user
    friend_requests = FriendRequest.objects.filter(receiver=user)
    serializer = FriendRequestSenderListSerializer(friend_requests, many=True)
    return Response({"status": "OK", "data": serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests_send_list(request):
    user = request.user
    friend_requests = FriendRequest.objects.filter(sender=user)
    serializer = FriendRequestReceiverListSerializer(friend_requests, many=True)
    return Response({"status": "OK", "data": serializer.data})

@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def friend_add_or_delete(request, user_id): 
    sender = request.user
    receiver = get_object_or_404(User,id=user_id)
    if request.method == 'POST':
        if receiver in sender.friends.all(): 
            return Response({"status": "FAIL", "msg": "이미 친구 등록된 유저입니다."}, status=status.HTTP_409_CONFLICT)
        # 친구 요청/ 요청 취소
        flag = request.data.get('flag')
        if flag: # 요청
            # 이미 요청한 상태라면
            if FriendRequest.objects.filter(sender=sender, receiver=receiver).exists():
                return Response({"status": "FAIL", "msg": "이미 친구 신청을 한 상태입니다."}, status=status.HTTP_409_CONFLICT)
            FriendRequest.objects.create(
                sender=sender,
                receiver=receiver
            )
            res = "ADD"
        else: # 요청 취소
            # 요청 리스트에 없다면
            if not FriendRequest.objects.filter(sender=sender, receiver=receiver).exists():
                return Response({"status": "FAIL", "msg": "친구 신청을 하지 않았습니다."}, status=status.HTTP_409_CONFLICT)
            request = FriendRequest.objects.get(sender=sender, receiver=receiver)
            request.delete()            
            res = "DELETE"
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
    
@api_view(['POST'])
def email_find(request):
    product_key = request.data.get('product_key')
    product = get_object_or_404(Product, product_key=product_key)
    if product.user:
        res = {'email': product.user.email}
        return Response({"status": "OK", "data": res})
    else:
        return Response({"status": "FAIL", "msg": "해당 제품키를 등록한 유저가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def main_info(request):
    if request.user.current_state != 1: # timesetting 테이블 만들어진 상태
        t = TimeSetting.objects.filter(user=request.user).order_by('-pk')[0]

        # 유저 상태 업데이트
        # 현재 시간 - start 시간 - [일시정지 시간] = ing 시간
        if (t.total_time or t.work_time) and request.user.current_state != 4:
            now = datetime.now(timezone.utc)
            if t.last_stop_time:
                ing = (now - t.created_at - t.last_stop_time).total_seconds()//60
            else:
                ing = (now - t.created_at).total_seconds()//60
            if t.work_time:
                request.user.current_state = user_state_check(ing, t.total_time, t.work_time, t.break_time)
            else:
                if ing >= t.total_time:
                    request.user.current_state = 1
            request.user.save()

        if Sensing.objects.filter(user=request.user, created_at__gte=t.created_at).exists(): # start 누른 후 센싱 값 있는 경우
            # 현재 시간 기준으로 10시간 전까지 30분 간격으로 자세 통계 계산(timesetting 설정한 이후 부터)
            now = datetime.now()
            ls = []
            for i in range(0,20):
                st = now - timedelta(minutes=i*30)
                ed = now - timedelta(minutes=(i+1)*30)
                cnt = Sensing.objects.filter(user=request.user, created_at__gte=t.created_at).filter(created_at__lte=st, created_at__gte=ed).count()
                if cnt:
                    avg = Sensing.objects.filter(user=request.user, created_at__gte=t.created_at).filter(created_at__lte=st, created_at__gte=ed).aggregate(Sum('posture_level'))['posture_level__sum']/cnt
                    ls.append({"time": str(st)[11:16], "score": avg})
            
            info = Sensing.objects.filter(user=request.user).order_by('-pk')[0]
            data = {
                'posture_level': info.posture_level,
                'temperature': info.temperature,
                'humidity': info.humidity,
                'posture_avg': ls,
                'user_state': request.user.current_state,
            }
            return Response({"status": "OK", "data": data})
    # 센싱 값 없는 경우 or 공부 중이 아닌 경우
    data = {
        'posture_level': 0,
        'temperature': 0,
        'humidity': 0,
        'posture_avg': [],
        'user_state': request.user.current_state,
    }
    return Response({"status": "OK", "data": data})

@api_view(['POST'])
def initial_info(request):
    product_key = request.data.get('product_key')
    p = get_object_or_404(Product, product_key=product_key)
    data = {
        'desired_humidity': p.user.desired_humidity,
        'auto_setting': p.user.auto_setting,
        'user_state': p.user.current_state,
    }
    return Response({"status": "OK", "data": data})

@api_view(['POST'])
def sensing_save(request):
    product_key = request.data.get('product_key')
    posture_level = request.data.get('posture_level')
    temperature = request.data.get('temperature')
    humidity = request.data.get('humidity')

    p = get_object_or_404(Product, product_key=product_key)
    # 공부 중일 때만 자세 값 저장
    if p.user.current_state == 2:
        Sensing.objects.create(user=p.user, posture_level=posture_level, temperature=temperature, humidity=humidity)
    
    if p.user.current_state != 1: # timesetting 테이블 만들어진 상태
        if TimeSetting.objects.filter(user=p.user).exists():
            t = TimeSetting.objects.filter(user=p.user).order_by('-pk')[0]
        else: # 예외처리
            return Response({"status": "FAIL", "error_msg": "잘못된 요청입니다"}, status=status.HTTP_400_BAD_REQUEST)
        
        # 유저 상태 업데이트
        # 현재 시간 - start 시간 - [일시정지 시간] = ing 시간
        if (t.total_time or t.work_time) and request.user.current_state != 4:
            now = datetime.now(timezone.utc)
            if t.last_stop_time:
                ing = (now - t.created_at - t.last_stop_time).total_seconds()//60
            else:
                ing = (now - t.created_at).total_seconds()//60
            if t.work_time:
                p.user.current_state = user_state_check(ing, t.total_time, t.work_time, t.break_time)
            else:
                if ing >= t.total_time:
                    p.user.current_state = 1
            p.user.save()
    data = {
        'desired_humidity': p.user.desired_humidity,
        "auto_setting": p.user.auto_setting,
        "user_state": p.user.current_state,
    }
    return Response({"status": "OK", "data": data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def timer_start(request):
    total_time = request.data.get('total_time')
    work_time = request.data.get('work_time')
    break_time = request.data.get('break_time')

    t = TimeSetting.objects.create(user=request.user, total_time=total_time, work_time=work_time, break_time=break_time, real_work_time=total_time)
    request.user.current_state = 2
    request.user.save()

    data = {
        "user_state": request.user.current_state,
        "time": TimeSettingSerializer(t).data
    }
    return Response({"status": "OK", "data": data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def timer_pause(request):
    if TimeSetting.objects.filter(user=request.user).exists():
        t = TimeSetting.objects.filter(user=request.user).order_by('-pk')[0]
        t.last_stop_time = datetime.now()
        t.save()
        request.user.current_state = 4
        request.user.save()
        data = {
            "user_state": request.user.current_state,
            "time": TimeSettingSerializer(t).data
        }
        return Response({"status": "OK", "data": data})
    else:
        return Response({"status": "FAIL", "error_msg": "잘못된 요청입니다"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def timer_restart(request):
    if TimeSetting.objects.filter(user=request.user).exists():
        t = TimeSetting.objects.filter(user=request.user).order_by('-pk')[0]
        # 예외처리(일시정지하지 않은 상태에서 요청 오면)
        if t.last_stop_time == None:
            return Response({"status": "FAIL", "error_msg": "잘못된 요청입니다"}, status=status.HTTP_400_BAD_REQUEST)
        # 현재 시간 - 일시정지한 시간
        now = datetime.now(timezone.utc)
        cha = now - t.last_stop_time
        # 위의 값을 분 단위로 바꾸기 + total에 합산
        t.total_stop_time += cha.total_seconds()//60
        # 일시정지 시간 초기화
        t.last_stop_time = None
        t.save()
        # 유저 상태 - 공부중
        request.user.current_state = 2
        request.user.save()

        data = {
            "user_state": request.user.current_state,
            "time": TimeSettingSerializer(t).data
        }
        return Response({"status": "OK", "data": data})
    else:
        return Response({"status": "FAIL", "error_msg": "잘못된 요청입니다"}, status=status.HTTP_400_BAD_REQUEST)  


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def timer_stop(request):
    if TimeSetting.objects.filter(user=request.user).exists():
        t = TimeSetting.objects.filter(user=request.user).order_by('-pk')[0]
        # 중간에 공부 멈추면, 현재 시간 - start한 시간(created_at) - 일시정지 시간 = 실제 공부 시간
        t.real_work_time = ((datetime.now(timezone.utc) - t.created_at).total_seconds()//60) - t.total_stop_time 
        t.save()

        request.user.current_state = 1
        request.user.save()

        data = {
            "user_state": request.user.current_state,
            "time": TimeSettingSerializer(t).data
        }
        return Response({"status": "OK", "data": data})
    else:
        return Response({"status": "FAIL", "error_msg": "잘못된 요청입니다"}, status=status.HTTP_400_BAD_REQUEST)  