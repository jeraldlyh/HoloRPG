from django.contrib.auth.models import User
from django.db.models import fields

from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import Character, Skill, UserProfile




class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"
