from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Character, Dungeon         # FIRST MIGRATION
from .serializers import UserProfileSerializer, CharacterSerializer

from .models import Bounty, Room, UserRelationship          # SECOND MIGRATION
from .serializers import DungeonSerializer, RoomSerializer, BountySerializer, UserRelationshipSerializer


# FIRST MIGRATION
class UserProfileViewSet(viewsets.ViewSet):
    serializer_class = UserProfileSerializer

    def get_object(self, pk):
        if pk.isdigit():
            user = User.objects.get(id=pk)
            return UserProfile.objects.get(user=user)
        return UserProfile.objects.get(user=pk)

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_profile = self.get_object(pk=pk)
                serializer = self.serializer_class(user_profile)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except (UserProfile.DoesNotExist, User.DoesNotExist):
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"})

    def list(self, request):
        queryset = UserProfile.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CharacterViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Character.objects.all()
        serializer = CharacterSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class SkillViewSet(viewsets.ModelViewSet):
#     queryset = Skill.objects.all()
#     serializer_class = SkillSerializer

# SECOND MIGRATION
class DungeonViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Dungeon.objects.all()
        serializer = DungeonSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RoomViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class = RoomSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Room.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = Room.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserRelationshipViewSet(viewsets.ViewSet):
    serializer_class = UserRelationshipSerializer

    def create(self, request):
        if request.data["user_from"][0] == request.data["user_to"][0]:
            return Response({"Bad Request": "Unable to befriend yourself"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserRelationship.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_profile_id = UserProfile.objects.filter(user__username=pk)[0].id
                relationships = UserRelationship.objects.filter(user_from=user_profile_id).values_list("user_to")
                friend_profiles = UserProfile.objects.filter(id__in=relationships)
                serializer = UserProfileSerializer(friend_profiles, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({"Relationships Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"})

class BountyViewSet(viewsets.ViewSet):
    serializer_class = BountySerializer

    def create(self, request):
        print(request.data)
        request_copy = request.data.copy()
        placed_by = request.data["placed_by"]
        target = request.data["target"]

        if placed_by == target:
            return Response({"Bad Request": "Unable to place bounty on yourself"}, status=status.HTTP_400_BAD_REQUEST)

        bounty_value = 100                          # To be computed by a formula to determine player's net worth
        player_currency = UserProfile.objects.get(user_id=placed_by).currency
        print(player_currency)

        if player_currency > bounty_value:
            request_copy["value"] = bounty_value                        # Insert bounty value in request data
            serializer = self.serializer_class(data=request_copy)

            if serializer.is_valid():
                Bounty.objects.create(**serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": f"Insufficient currency to place bounty on {target}"}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = Bounty.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)