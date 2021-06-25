from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserEntityCreate, UserEntityDetail, claim_stacked_income, EntityListCreate


router = DefaultRouter()
# router.register(r"entity", EntityViewSet, basename="entity")
# router.register(r"userentity", UserEntityViewSet, basename="userentity")

urlpatterns = [
    path("", include(router.urls)),
    path("entity/", EntityListCreate.as_view()),
    path("entity/<str:pk>", UserEntityDetail.as_view()),
    path("entity/purchase/", UserEntityCreate.as_view()),
    path(r"income/", claim_stacked_income, name="income")
]