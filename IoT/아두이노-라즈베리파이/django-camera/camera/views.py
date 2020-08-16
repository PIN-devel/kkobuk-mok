import serial,time
import requests, json

from django.shortcuts import render
from django.core.cache import cache

from picamera import PiCamera

from rest_framework.response import Response
from rest_framework.decorators import api_view

import tensorflow.keras
from PIL import Image, ImageOps
import numpy as np


# initialize cache
SERVER_URL = 'http://3.35.17.150:8000'
init_res = requests.post(SERVER_URL+'/accounts/initialinfo/',data={"product_key":"1111-1111-1111-1111"})
init_data = init_res.json()['data']
cache.set_many(init_data)


# initialize arduino
arduino = serial.Serial("/dev/ttyACM0",9600)


# initialize tensorflow model
np.set_printoptions(suppress=True)
model = tensorflow.keras.models.load_model('keras_model.h5')
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)


# controller
def index(request):
    return render(request,'index.html')


# main function
@api_view(['GET'])
def take_pic(request):
    # user_state 1 - 아무것도 안함 2 - 공부중 3 - 휴식중 4 - 일시정지
    pre_user_state = cache.get('user_state')

    if pre_user_state == 2:
        #start = time.time()
        img_src= 'static/image/image.jpg'
        camera = PiCamera()
        camera.resolution = (224, 224)
        time.sleep(5)
        camera.capture(img_src)
        camera.close()
        # print("카메라 촬영 종료 :", time.time() - start)
        
        image = Image.open(img_src)
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        data[0] = normalized_image_array
        # print("이미지 프로세싱 종료 :", time.time() - start)
        
        prediction = model.predict(data)
        tmpList = prediction[0]
        max_val = -1
        for i in range(3):
            if max_val<tmpList[i]:
                max_val=tmpList[i]
                idx=i+1
        # print("ai예측 종료 :", time.time() - start)
        
        # motor control
        cmd = "MC"+str(idx)
        print('cmd: ',cmd)
        arduino.write(cmd.encode()) 
        if arduino.readable():
            tmp = arduino.readline()
            print('MCres',tmp.decode())
            motor = tmp.decode('utf-8')[:len(tmp)-3]
        
        # get hum, tem data
        arduino.write('SR'.encode())
        if arduino.readable():
            tmp = arduino.readline()
            print('SRres',tmp.decode())
            sensor = tmp.decode('utf-8')[2:len(tmp)-3]
            tem,hum=sensor.split(',')
        
        # save data
        res = requests.post(
            SERVER_URL+'/accounts/sensingsave/',
            data={
                "posture_level":int(motor[2:]),
                "product_key":"1111-1111-1111-1111",
                "temperature":float(tem),
                "humidity":float(hum)
                }
            )
        cache.set_many(res.json()['data'])
        
        # user_state 1 - 아무것도 안함 2 - 공부중 3 - 휴식중 4 - 일시정지
        user_state = cache.get('user_state')
        auto_setting = cache.get('auto_setting')
        desired_humidity = cache.get('desired_humidity')
        humidifier_on_off = cache.get('humidifier_on_off')
        silent_mode = cache.get('silent_mode')
        theme = cache.get('theme')

        cache.set('humidifier_state',False)
        # 가습기 제어
        if auto_setting: # 공부중이면서 가습기 auto setting mode일 경우
            if float(desired_humidity) > float(hum):
                if not cache.get('humidifier_state'):
                    arduino.write('RON'.encode())
                    if arduino.readable():
                        tmp = arduino.readline()
                        print('Rres',tmp.decode())
                    cache.set('humidifier_state',True)

            else:
                if cache.get('humidifier_state'):
                    arduino.write('ROF'.encode())
                    if arduino.readable():
                        tmp = arduino.readline()
                        print('Rres',tmp.decode())
                    cache.set('humidifier_state',False)
        else:
            if humidifier_on_off:
                if not cache.get('humidifier_state'):
                    arduino.write('RON'.encode())
                    if arduino.readable():
                        tmp = arduino.readline()
                        print('Rres',tmp.decode())
                    cache.set('humidifier_state',True)
            else:
                if cache.get('humidifier_state'):
                    arduino.write('ROF'.encode())
                    if arduino.readable():
                        tmp = arduino.readline()
                        print('Rres',tmp.decode())
                    cache.set('humidifier_state',False)
        
        # 알람
        if not silent_mode:
            if user_state == 3:
                cmd = "MS"+str(theme)
                arduino.write(cmd.encode())
                if arduino.readable():
                    tmp = arduino.readline()
                    print('Rres',tmp.decode())


        print("1싸이클 종료 :", time.time() - start)

    elif pre_user_state == 3:
        SERVER_URL = 'http://3.35.17.150:8000'
        res = requests.post(SERVER_URL+'/accounts/initialinfo/',data={"product_key":"1111-1111-1111-1111"})
        data = res.json()['data']
        cache.set_many(data)
        user_state = cache.get('user_state')
        silent_mode = cache.get('silent_mode')
        theme = cache.get('theme')

        if user_state == 2 and not silent_mode:
            cmd = "ME"+str(theme)
            arduino.write(cmd.encode())
            if arduino.readable():
                tmp = arduino.readline()
                print('Rres',tmp.decode()) 

    return Response({"status":"OK"})



@api_view(['GET'])
def sensor_read(request):
    arduino.write('SR'.encode())
    if arduino.readable():
        tmp = arduino.readline()
        res = tmp.decode('utf-8')[2:len(tmp)-1]
    context={
        'res':res
    }
    return Response(context)


@api_view(['GET'])
def motor_control(request,level):
    cmd = "MC"+str(level)
    arduino.write(cmd.encode())
    if arduino.readable():
        tmp = arduino.readline()
        res = tmp.decode('utf-8')[:len(tmp)-1]
    context={
        'res':res
    }
    return Response(context)