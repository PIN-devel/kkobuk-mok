from django.shortcuts import render
from picamera import PiCamera
from .tensorflow.tensorflow import outPrint
################
import tensorflow.keras
from PIL import Image, ImageOps
import numpy as np
import os


def index(request):
    img_src= 'static/image/image.jpg'
    camera = PiCamera()
    camera.resolution = (224, 224)
    camera.capture(img_src)
    camera.close()
    context={
        "result" : outPrint(img_src)     
    }
    
    return render(request,'index.html',context)