from django.urls import path
from . import views

urlpatterns = [
    path('friend/', views.friends_list),
    path('friend/<int:user_id>/', views.friend_add_or_delete),

    path('certification/', views.key_certification),
    path('registration/', views.key_registration),

    path('friend/<int:user_id>/accept/', views.friend_accept),
    path('friend/<int:user_id>/reject/', views.friend_reject),
   
    path('friend/request/receive/', views.friend_requests_receive_list),
    path('friend/request/send/', views.friend_requests_send_list),

    path('find/', views.email_find),

    path('maininfo/', views.main_info),
    # 라즈베리파이
    path('initialinfo/', views.initial_info),
    path('sensingsave/', views.sensing_save),

    # 타이머 로직
    path('timer/start/', views.timer_start),
    path('timer/pause/', views.timer_pause),
    path('timer/restart/', views.timer_restart),
    path('timer/stop/', views.timer_stop),
    
    path('', views.list),
    path('<int:user_id>/', views.detail_or_delete_or_update),
]
