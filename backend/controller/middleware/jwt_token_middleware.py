from django.utils.deprecation import MiddlewareMixin
from rest_framework import status
from rest_framework.response import Response


class JWTTokenMiddleware:
    def __init__(self, get_response=None):
        self.get_response = get_response

    def process_request(self, request):
        data = getattr(request, "_body", request.body)
        request._body = data + "&refresh=" + request.COOKIES.get("refresh_token")
        print(request.POST)
        return None


    # def __call__(self, request):
    #     ALLOWED_URLS = ["/auth/login/", "/auth/register/"]
    #     access_token = request.COOKIES.get("access_token")
    #     refresh_token = request.COOKIES.get("refresh_token")

    #     if request.path in ALLOWED_URLS:
    #         return self.get_response(request)
    #     elif request.path == "/auth/token/refresh/":
    #         request._body["refresh"] = refresh_token
    #         print(request.POST)

    #     if access_token is not None:
    #         request.META["HTTP_AUTHORIZATION"] = f"Bearer {access_token}"
    #         return self.get_response(request)
    #     return Response({"Error": "No access token provided"}, status=status.HTTP_400_BAD_REQUEST)

