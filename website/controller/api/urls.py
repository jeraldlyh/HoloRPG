from django.conf.urls import url
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from .views import CharacterViewSet, DungeonViewSet, UserProfileViewSet, UserViewSet


router = DefaultRouter()
# router.register(r"profile", UserProfileViewSet, basename="profile")
router.register(r"dungeon", DungeonViewSet, basename="dungeon")
router.register(r"character", CharacterViewSet, basename="character")
router.register(r"user", UserViewSet, basename="user")

urlpatterns = [
    path("profile/<str:pk>/", UserProfileViewSet.as_view()),
    # path("", include(router.urls)),
]
# urlpatterns = format_suffix_patterns(urlpatterns)
