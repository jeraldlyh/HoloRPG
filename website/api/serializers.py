from django.contrib.auth.models import User
from django.db.models import fields

from rest_framework import serializers
from .models import Character, UserProfile, Dungeon, Skill
from .models import Bounty, Room, UserRelationship

# FIRST MIGRATION
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ["id"]

    account_age = serializers.ReadOnlyField(source="get_account_age")

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

# SECOND MIGRATION
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class DungeonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dungeon
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

    profile_pictures = serializers.ReadOnlyField(source="get_profile_pictures")

class UserRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelationship
        exclude = ["id"]

class BountySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bounty
        fields = "__all__"

    target_health = serializers.ReadOnlyField(source="get_target_health")