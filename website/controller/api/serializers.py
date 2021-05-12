from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"