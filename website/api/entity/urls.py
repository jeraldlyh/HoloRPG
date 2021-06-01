from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EntityViewSet, UserEntityViewSet    # FIRST MIGRATION


router = DefaultRouter()
router.register(r"entity", EntityViewSet, basename="entity")
router.register(r"userentity", UserEntityViewSet, basename="userentity")

urlpatterns = [
    path("", include(router.urls)),
]