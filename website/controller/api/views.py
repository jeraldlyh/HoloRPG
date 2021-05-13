from rest_framework import viewsets
from .models import Article, UserAccount
from .serializers import ArticleSerializer, UserAccountSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer