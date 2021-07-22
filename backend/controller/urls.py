from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.user.urls")),           # Permits URL links in user
    # path("api/", include("api.room.urls")),           # Permits URL links in room
    path("api/", include("api.entity.urls")),         # Permits URL links for income generating entities
    path("api/", include("api.stock.urls")),          # Permits URL links for stocks
    path("api/auth/", include("accounts.urls")),          # Permits URL links in accounts
    path("api/auth/", include("dj_rest_auth.urls")),
]
