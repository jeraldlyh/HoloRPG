from django.db.models import query
from django.http.response import Http404
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, SAFE_METHODS
from rest_framework import viewsets, mixins, status, views
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer

from .models import Character, Dungeon, Skill, UserProfile
from .serializers import CharacterSerializer, DungeonSerializer, SkillSerializer, UserProfileSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    - CREATE: AllowAny
    - Other requests: IsAdminUser
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action in ["create"]:
            self.permission_classes = [AllowAny, ]
        else:
            self.permission_classes = [IsAdminUser, ]
        return super().get_permissions()

class UserProfileViewSet(views.APIView):
    """
    - CREATE: AllowAny
    - GET, HEAD, OPTIONS: IsAuthenticated
    - LIST: IsAdminUser
    """

    # def get_permissions(self):
    #     if self.action in ["create"]:
    #         self.permission_classes = [AllowAny, ]
    #     elif self.action in SAFE_METHODS:
    #         self.permission_classes = [IsAuthenticated, ]
    #     elif self.action in ["list"]:
    #         self.permission_classes = [AllowAny, IsAdminUser, ]
    #     return super().get_permissions()
    # def get(self, request, format=None):
    #     code = request.GET.get(self.lookup_url_kwarg)
    #     if code != None:
    #         room = Room.objects.filter(code=code)

    #         if len(room) > 0:
    #             data = RoomSerializer(room[0]).data
    #             data["is_host"] = self.request.session.session_key == room[0].host
    #             return Response(data, status=status.HTTP_200_OK)
    #         return Response({"Room Not Found" : "Invalid room code"}, status=status.HTTP_404_NOT_FOUND)
    #     return Response({"Bad Request" : "Code parameter not found in request"}, status=status.HTTP_400_BAD_REQUEST)
    def get_object(self, pk):
        try:
            return UserProfile.objects.get(user_id=pk)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class DungeonViewSet(viewsets.ModelViewSet):
    queryset = Dungeon.objects.all()
    serializer_class = DungeonSerializer