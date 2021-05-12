from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet


router = DefaultRouter()
router.register("articles", ArticleViewSet, basename="articles")

urlpatterns = [
    path("api/", include(router.urls)),
]
