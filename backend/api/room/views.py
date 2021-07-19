from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Room, Dungeon
from .services import create_room
from .serializers import RoomSerializer, DungeonSerializer
from .selectors import get_all_dungeons, get_all_rooms

class RoomViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class = RoomSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            create_room(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        serializer = self.serializer_class(get_all_rooms(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DungeonViewSet(viewsets.ViewSet):
    def list(self, request):
        serializer = DungeonSerializer(get_all_dungeons(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)