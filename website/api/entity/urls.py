from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserEntityViewSet    # FIRST MIGRATION


router = DefaultRouter()
router.register(r"entity", UserEntityViewSet, basename="entity")

urlpatterns = [
    path("", include(router.urls)),
]