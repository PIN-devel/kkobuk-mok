from rest_framework import serializers

from .models import Room
from accounts.serializers import MemberSerializer

class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'password', )

class RoomSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, required=False)
    class Meta:
        model = Room
        fields = ('id', 'name', 'members', )