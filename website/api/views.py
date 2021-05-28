from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer
from .models import Character, Dungeon, UserProfile, Room, UserRelationship
from .serializers import CharacterSerializer, DungeonSerializer, RoomSerializer, UserProfileSerializer, UserRelationshipSerializer

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
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserRelationshipViewSet(viewsets.ViewSet):
    serializer_class = UserRelationshipSerializer

    def create(self, request):
        if request.data["user_from"][0] == request.data["user_to"][0]:
            return Response({"Bad Request": "Unable to befriend the same user"}, status=status.HTTP_400_BAD_REQUEST)

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