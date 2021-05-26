from django.contrib.auth.models import User
from django.db.models import fields

from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import Character, Dungeon, UserProfile, Room



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("level", "experience", "currency", "reputation", "max_health", "current_health", "attack", "defence", "status")
        
class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

# class SkillSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Skill
#         fields = "__all__"

class DungeonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dungeon
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"