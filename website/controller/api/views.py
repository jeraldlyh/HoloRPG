from django.db.models import query
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

class UserProfileViewSet(views.APIView, mixins.RetrieveModelMixin):
    """
    - CREATE: AllowAny
    - GET, HEAD, OPTIONS: IsAuthenticated
    - LIST: IsAdminUser
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    # def get_permissions(self):
    #     if self.action in ["create"]:
    #         self.permission_classes = [AllowAny, ]
    #     elif self.action in SAFE_METHODS:
    #         self.permission_classes = [IsAuthenticated, ]
    #     elif self.action in ["list"]:
    #         self.permission_classes = [AllowAny, IsAdminUser, ]
    #     return super().get_permissions()
    
    def get(self, request, pk=None):
        # queryset = UserProfile.objects.filter(user_id=kwargs["pk"])
        
        serializer = UserProfileSerializer()
        print(serializer)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors)
    
    

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class DungeonViewSet(viewsets.ModelViewSet):
    queryset = Dungeon.objects.all()
    serializer_class = DungeonSerializer