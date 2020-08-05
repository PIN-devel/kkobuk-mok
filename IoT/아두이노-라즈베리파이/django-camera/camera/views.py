import serial,time

from django.shortcuts import render

from picamera import PiCamera

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .TeachableMachine.tensorflow import outPrint


arduino = serial.Serial("/dev/ttyACM0",9600)

def index(request):
    return render(request,'index.html')

@api_view(['GET'])
def take_pic(request):
    img_src= 'static/image/image.jpg'
    camera = PiCamera()
    camera.resolution = (224, 224)
    camera.capture(img_src)
    camera.close()
    tmpList = outPrint(img_src)[0]
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
    context = {
        "motor":motor,
        "sensor":sensor
    }
    return Response(context)

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