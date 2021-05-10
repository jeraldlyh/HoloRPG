from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer, UserSerializer


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer