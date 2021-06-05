from rest_framework import serializers
from .models import UserProfile, Character, Skill
from .models import Bounty, UserRelationship

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ["id", "character"]

    account_age = serializers.ReadOnlyField(source="get_account_age")
    character_class = serializers.ReadOnlyField(source="get_character_class")
    rank = serializers.ReadOnlyField(source="get_rank")
    income_accumulated = serializers.ReadOnlyField(source="get_income_accumulated")
    net_worth = serializers.ReadOnlyField(source="get_net_worth")

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class UserRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelationship
        exclude = ["id"]

class BountySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bounty
        fields = "__all__"

    target_health = serializers.ReadOnlyField(source="get_target_health")