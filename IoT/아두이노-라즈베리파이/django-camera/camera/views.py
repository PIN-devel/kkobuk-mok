from django.shortcuts import render
from picamera import PiCamera

# Create your views here.
def index(request):
    camera = PiCamera()
    camera.capture('static/image/image.jpg')
    return render(request,'index.html')