from rest_framework import serializers
from .models import UserEntity

class UserEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEntity
        fields = "__all__"