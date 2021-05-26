from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer



class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # serializer.is_valid(raise_exception=True)
        # user = serializer.save()
        # return Response({
        #     "user": UserSerializer(user, context=self.get_serializer_context()).data,
        #     "token": AuthToken.objects.create(user)[1]
        # })


class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # user = serializer.validated_data
        # return Response({
        #     "user": UserSerializer(user, context=self.get_serializer_context()).data,
        #     "token": AuthToken.objects.create(user)[1]
        # })
class BlacklistTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)