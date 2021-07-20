import datetime
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.tokens import RefreshToken

User._meta.get_field("email")._unique = True
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class TokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["name"] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["refresh_expiry"] = refresh["exp"]
        data["access"] = str(refresh.access_token)
        data["access_expiry"] = refresh.access_token["exp"]
        return data


class TokenRefreshSerializer(serializers.Serializer):
    def get_token_from_cookie(self):
        request = self.context["request"]
        return request.COOKIES.get(settings.JWT_COOKIE_NAME)

    def validate(self, attrs):
        token = self.get_token_from_cookie()
        if token is None:
            raise serializers.ValidationError(
                "No refresh token cookie found"
            )

        refresh = RefreshToken(token)
        data = {
            "access": str(refresh.access_token),
            "access_expiry": refresh.access_token["exp"]
        }

        if jwt_settings.BLACKLIST_AFTER_ROTATION:
            try:
                refresh.blacklist()
            except AttributeError:
                pass

        refresh.set_jti()
        refresh.set_exp()

        data["refresh"] = str(refresh)
        data["refresh_expiry"] = refresh["exp"]
        return data