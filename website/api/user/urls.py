from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet
from .views import BountyViewSet, UserRelationshipViewSet, CharacterViewSet


router = DefaultRouter()
router.register(r"profile", UserProfileViewSet, basename="profile")
router.register(r"relationship", UserRelationshipViewSet, basename="relationship")
router.register(r"character", CharacterViewSet, basename="character")
router.register(r"bounty", BountyViewSet, basename="bounty")

urlpatterns = [
    path("", include(router.urls)),
]