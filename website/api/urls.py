from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CharacterViewSet, DungeonViewSet, RoomViewSet, UserProfileViewSet, UserRelationshipViewSet


router = DefaultRouter()
router.register(r"profile", UserProfileViewSet, basename="profile")
router.register(r"dungeon", DungeonViewSet, basename="dungeon")
router.register(r"character", CharacterViewSet, basename="character")
router.register(r"room", RoomViewSet, basename="room")
router.register(r"relationship", UserRelationshipViewSet, basename="relationship")

urlpatterns = [
    path("", include(router.urls)),
]