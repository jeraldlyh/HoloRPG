from django.urls import path
from .views import LeadViewSet

urlpatterns = [
    path("", LeadViewSet),
]
