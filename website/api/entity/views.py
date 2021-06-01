from collections import OrderedDict
from django.db.models.expressions import F
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from ..user.models import UserProfile
from .models import Entity, UserEntity
from .serializers import EntitySerializer, UserEntitySerializer

class EntityViewSet(viewsets.ViewSet):
    serializer_class = EntitySerializer

    def list(self, request):
        queryset = Entity.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Entity.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserEntityViewSet(viewsets.ViewSet):
    serializer_class = UserEntitySerializer

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                entities = UserEntity.objects.filter(user__user_id=pk)
                serializer = self.serializer_class(entities, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"})

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserEntity.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
