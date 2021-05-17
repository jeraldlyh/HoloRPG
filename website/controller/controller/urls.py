from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("frontend.urls")),          # Permits URL links in frontend
    path("api/", include("api.urls")),           # Permits URL links in backend
    path("auth/", include("accounts.urls")),     # Permits URL links in accounts
]
