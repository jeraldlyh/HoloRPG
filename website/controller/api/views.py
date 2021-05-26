from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, SAFE_METHODS
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Character, Dungeon, UserProfile, Room
from .serializers import CharacterSerializer, DungeonSerializer, RoomSerializer, UserProfileSerializer, UserSerializer


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

class UserProfileViewSet(viewsets.ViewSet):
    """
        /api/profile/?username=<username>
    """

    serializer_class = UserProfileSerializer

    def get_object(self, pk):
        if pk.isdigit():
            return UserProfile.objects.get(user_id=pk)
        user = User.objects.get(username=pk)
        return UserProfile.objects.get(user=user)

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_profile = self.get_object(pk=pk)
                data = self.serializer_class(user_profile).data
                return Response(data, status=status.HTTP_200_OK)
            except (UserProfile.DoesNotExist, User.DoesNotExist):
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"})

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
        return Response({"Bad Request": "Invalid data specified"}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = Room.objects.all()
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)