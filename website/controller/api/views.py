from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User

from .models import Lead
from .serializers import LeadSerializer

# Create your views here.
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     A viewset for viewing and editing user instances.
#     """
#     serializer_class = UserSerializer
#     queryset = User.objects.all()