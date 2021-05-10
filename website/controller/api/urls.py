from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, UserViewSet


router = DefaultRouter()
router.register("articles", ArticleViewSet, basename="articles")
router.register("users", UserViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
