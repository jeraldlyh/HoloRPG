from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from ..user.models import UserProfile
from .models import Entity, UserEntity
from .serializers import EntitySerializer, UserEntitySerializer
from .services import create_entity, update_or_create_user_entity
from .selectors import get_all_entities, get_user_entities_by_username

class EntityViewSet(viewsets.ViewSet):
    serializer_class = EntitySerializer

    def list(self, request):
        queryset = Entity.objects.all()
        serializer = self.serializer_class(get_all_entities(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            create_entity(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserEntityViewSet(viewsets.ViewSet):
    serializer_class = UserEntitySerializer

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_entity = get_user_entities_by_username(pk)
                serializer = self.serializer_class(user_entity, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            updated_entities = update_or_create_user_entity(serializer.validated_data)
            serialized_data = self.serializer_class(updated_entities, many=True)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
