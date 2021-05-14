from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileSerializer


router = DefaultRouter()
# router.register("useraccount", UserProfileSerializer)
# router.register("character")

urlpatterns = [
    path("api/", include(router.urls)),
]
