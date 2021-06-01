from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Room, Dungeon
from .serializers import RoomSerializer, DungeonSerializer

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

class DungeonViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Dungeon.objects.all()
        serializer = DungeonSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)