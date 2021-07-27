from rest_framework import serializers
from .models import UserProfile, Character
from .models import Bounty, UserRelationship

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ["is_active", "is_staff", "is_superuser", "password", "user_permissions", "date_joined", "groups"]

    account_age = serializers.ReadOnlyField(source="get_account_age")
    character_class = serializers.ReadOnlyField(source="get_character_class")
    rank = serializers.ReadOnlyField(source="get_rank")
    income_accumulated = serializers.ReadOnlyField(source="get_income_accumulated")
    net_worth = serializers.ReadOnlyField(source="get_net_worth")
    last_collected = serializers.ReadOnlyField(source="get_last_collected")


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"


class UserRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelationship
        fields = "__all__"


class BountySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bounty
        fields = "__all__"

    target_health = serializers.ReadOnlyField(source="get_target_health")