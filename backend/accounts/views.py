from datetime import datetime
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenViewBase

from .serializers import RegisterSerializer, TokenObtainPairSerializer, TokenRefreshSerializer


class RegisterAPIView(APIView):
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
            
        return {
            "refresh": str(refresh),
            "refresh_expiry": refresh["exp"],
            "access": str(refresh.access_token),
            "access_expiry": refresh.access_token["exp"],
        }

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            tokens = self.get_tokens_for_user(user)
            data = { key: value for key, value in tokens.items() if "access" in key }        # Remove refresh token in response

            response = Response(data, status=status.HTTP_200_OK)
            response.set_cookie(
                key=settings.JWT_COOKIE_NAME,
                value=tokens["refresh"],
                expires=tokens["refresh_expiry"],
                secure=settings.JWT_COOKIE_SECURE,
                httponly=True,
                samesite=settings.JWT_COOKIE_SAMESITE
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenViewBaseWithCookie(TokenViewBase):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            data = { key: value for key, value in tokens.items() if "access" in key }        # Remove refresh token in response

            response = Response(data, status=status.HTTP_200_OK)
            response.set_cookie(
                key=settings.JWT_COOKIE_NAME,
                value=tokens["refresh"],
                expires=tokens["refresh_expiry"],
                secure=settings.JWT_COOKIE_SECURE,
                httponly=True,
                samesite=settings.JWT_COOKIE_SAMESITE
            )
            return response
        except TokenError as e:
            return Response({"Error": InvalidToken(e.args[0])}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(TokenViewBaseWithCookie):
    serializer_class = TokenObtainPairSerializer


class CustomTokenRefreshView(TokenViewBaseWithCookie):
    serializer_class = TokenRefreshSerializer


class LogoutView(APIView):
    def post(self, request):
        try:
            response = Response()
            refresh_token = request.COOKIES.get("refresh_token")
            if not refresh_token:
                raise Exception("Refresh token does not exist")
            token = RefreshToken(refresh_token)
            token.blacklist()
            response.status_code = 200
            response.delete_cookie("refresh_token")
            return response
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
