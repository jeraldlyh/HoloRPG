from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, UserProfileViewSet
from .views import BountyViewSet, UserRelationshipViewSet


router = DefaultRouter()
router.register(r"profile", UserProfileViewSet, basename="profile")
router.register(r"skill", SkillViewSet, basename="skill")
router.register(r"relationship", UserRelationshipViewSet, basename="relationship")
router.register(r"bounty", BountyViewSet, basename="bounty")

urlpatterns = [
    path("", include(router.urls)),
]