from rest_framework import serializers
from .models import Entity, UserEntity

class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = "__all__"

class UserEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEntity
        fields = "__all__"
    
    income = serializers.ReadOnlyField(source="get_income")