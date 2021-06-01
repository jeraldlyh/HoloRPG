from rest_framework import serializers
from .models import Room, Dungeon

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

    profile_pictures = serializers.ReadOnlyField(source="get_profile_pictures")

class DungeonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dungeon
        fields = "__all__"