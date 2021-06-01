from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DungeonViewSet, RoomViewSet


router = DefaultRouter()
router.register(r"dungeon", DungeonViewSet, basename="dungeon")
router.register(r"room", RoomViewSet, basename="room")

urlpatterns = [
    path("", include(router.urls)),
]