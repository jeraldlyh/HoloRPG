from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BountyListCreate, BountyPatch, UserProfileDetail, UserProfileList, UserRelationshipCreate, UserRelationshipDetail


# router = DefaultRouter()
# router.register(r"profile", UserProfileViewSet, basename="profile")
# router.register(r"skill", SkillViewSet, basename="skill")
# router.register(r"relationship", UserRelationshipViewSet, basename="relationship")
# router.register(r"bounty", BountyViewSet, basename="bounty")

urlpatterns = [
    # path("", include(router.urls)),
    path("profile/", UserProfileList),
    path("profile/<str:pk>", UserProfileDetail),
    path("bounty/", BountyListCreate),
    path("bounty/<str:pk>", BountyPatch),
    path("relationship/", UserRelationshipCreate),
    path("relationship/<str:pk>", UserRelationshipDetail),
]