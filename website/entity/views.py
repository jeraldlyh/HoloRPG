from collections import OrderedDict
from django.db.models.expressions import F
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import UserEntity
from .serializers import UserEntitySerializer

class UserEntityViewSet(viewsets.ViewSet):
    serializer_class = UserEntitySerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserEntity.objects.create(**serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
