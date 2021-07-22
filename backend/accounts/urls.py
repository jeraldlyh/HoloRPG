from django.urls import path
from .views import GoogleLoginView

urlpatterns = [
    path("social/google/", GoogleLoginView.as_view())
]