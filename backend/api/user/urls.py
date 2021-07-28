from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BountyListCreate, BountyPatch, UserProfileDetail, UserProfileList, UserRelationshipCreate, UserRelationshipDetail, BountyViewSet, UserRelationshipViewSet


router = DefaultRouter()
router.register(r"relationshipcreate", UserRelationshipViewSet, basename="relationship")
router.register(r"bountycreate", BountyViewSet, basename="bountycreate")

urlpatterns = [
    path("", include(router.urls)),
    path("profile/", UserProfileList.as_view()),
    path("profile/<str:pk>/", UserProfileDetail.as_view()),
    path("bounty/", BountyListCreate.as_view()),
    path("bounty/<str:pk>/", BountyPatch.as_view()),
    path("relationship/", UserRelationshipCreate.as_view()),
    path("relationship/<str:pk>/", UserRelationshipDetail.as_view()),
]