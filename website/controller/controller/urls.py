from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("frontend.urls")),          # Permits URL links in frontend
    path("api/", include("api.urls")),           # Permits URL links in backend
    path("auth/", include("accounts.urls")),     # Permits URL links in accounts
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
]
