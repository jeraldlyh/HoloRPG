from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CharacterViewSet, DungeonViewSet, UserProfileViewSet, UserViewSet


router = DefaultRouter()
# router.register(r"profile", UserProfileViewSet, basename="profile")
router.register(r"dungeon", DungeonViewSet, basename="dungeon")
router.register(r"character", CharacterViewSet, basename="character")
router.register(r"user", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path("user", include(UserProfileViewSet.as_view()))
]
