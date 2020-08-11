import serial,time
import requests, json

from django.shortcuts import render

from picamera import PiCamera

from rest_framework.response import Response
from rest_framework.decorators import api_view

# from .TeachableMachine.tensorflow import outPrint
import tensorflow.keras
from PIL import Image, ImageOps
import numpy as np

SERVER_URL = 'http://3.35.17.150'

arduino = serial.Serial("/dev/ttyACM0",9600)
np.set_printoptions(suppress=True)
model = tensorflow.keras.models.load_model('keras_model.h5')
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
size = (224, 224)


def index(request):
    return render(request,'index.html')

@api_view(['GET'])
def take_pic(request):

    start = time.time()
    img_src= 'static/image/image.jpg'
    camera = PiCamera()
    camera.resolution = (224, 224)
    time.sleep(5)
    camera.capture(img_src)
    camera.close()
    # print("카메라 촬영 종료 :", time.time() - start)
    image = Image.open(img_src)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
    data[0] = normalized_image_array
    # print("이미지 프로세싱 종료 :", time.time() - start)
    prediction = model.predict(data)
    tmpList = prediction[0]
    # print("ai예측 종료 :", time.time() - start)
    max_val = -1
    for i in range(3):
        if max_val<tmpList[i]:
            max_val=tmpList[i]
            idx=i+1
    
    cmd = "MC"+str(idx)
    arduino.write(cmd.encode())
    if arduino.readable():
        tmp = arduino.readline()
        motor = tmp.decode('utf-8')[:len(tmp)-3]
    arduino.write('SR'.encode())
    if arduino.readable():
        tmp = arduino.readline()
        sensor = tmp.decode('utf-8')[2:len(tmp)-3]
    
    tem,hum=sensor.split(',')
    # product_key, posture_level, temperature, humidity
    
    res = requests.post(SERVER_URL+'/accounts/sensingsave/',data={"posture_level":int(motor[2:]),"product_key":"1111-1111-1111-1111","temperature":float(tem),"humidity":float(hum)})
    user_state = res.json()['data']['user_state'] # 1 - 아무것도 안함 2 - 공부중 3 - 휴식중
    auto_setting = res.json()['data']['auto_setting']
    desired_humidity = res.json()['data']['desired_humidity']

    # 가습기 제어
    if user_state == 2 and auto_setting:
        if desired_humidity > hum:
            arduino.write('RON'.encode())
        else:
            arduino.write('ROF'.encode())
    else:
        arduino.write('ROF'.encode())
    print("1싸이클 종료 :", time.time() - start)
    return Response({})

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