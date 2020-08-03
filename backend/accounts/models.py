from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser

from imagekit.models import ImageSpecField
from imagekit.processors import Thumbnail



from rooms.models import Room

# Create your models here.
class TimeSetting(models.Model):
    total_time = models.IntegerField()
    work_time = models.IntegerField()
    break_time = models.IntegerField()

class User(AbstractUser):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)

    GENDER_CHOICES = [(0, 'Male'), (1, 'Female')]
    gender = models.IntegerField(default=True, choices=GENDER_CHOICES)
    
    time_setting = models.OneToOneField(TimeSetting, on_delete=models.SET_NULL, null=True)
    
    desired_humidity = models.IntegerField(null=True)
    
    auto_setting = models.BooleanField(default=False)
    
    birth_date = models.DateField(null=True)

    image = models.ImageField(default='/images/default_user.png', upload_to='profile') # 업로드 경로 설정 다시 해야함! media 디렉토리
    image_thumbnail = ImageSpecField(
        source = 'image',
        processors = [Thumbnail(100,100)],
        format = 'JPEG',
        options = {'quality':60}
    )

    # 
    friends = models.ManyToManyField('self')

    # product_key = models.CharField(max_length=200)

    room = models.ForeignKey(Room, null=True, on_delete=models.CASCADE, related_name='members')

class FriendRequest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sending')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiving')

class Posture(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    time_level1 = models.IntegerField()
    time_level2 = models.IntegerField()
    time_level3 = models.IntegerField()

class Product(models.Model):
    product_key = models.CharField(max_length=200)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)