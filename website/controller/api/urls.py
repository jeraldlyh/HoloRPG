from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, UserAccountViewSet


router = DefaultRouter()
router.register("articles", ArticleViewSet, basename="articles")
router.register("useraccount", UserAccountViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
