from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, CharacterViewSet, DungeonViewSet     # FIRST MIGRATION
from .views import RoomViewSet, BountyViewSet, UserRelationshipViewSet      # SECOND MIGRATION


router = DefaultRouter()
router.register(r"profile", UserProfileViewSet, basename="profile")
router.register(r"character", CharacterViewSet, basename="character")
router.register(r"dungeon", DungeonViewSet, basename="dungeon")
router.register(r"room", RoomViewSet, basename="room")
router.register(r"relationship", UserRelationshipViewSet, basename="relationship")
router.register(r"bounty", BountyViewSet, basename="bounty")

urlpatterns = [
    path("", include(router.urls)),
]