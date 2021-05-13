from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import Article, UserAccount


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = "__all__"