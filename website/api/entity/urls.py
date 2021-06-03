from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EntityViewSet, UserEntityViewSet, claim_stacked_income


router = DefaultRouter()
router.register(r"entity", EntityViewSet, basename="entity")
router.register(r"userentity", UserEntityViewSet, basename="userentity")

urlpatterns = [
    path("", include(router.urls)),
    path(r"income/", claim_stacked_income, name="income")
]