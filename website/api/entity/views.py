from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import EntitySerializer, UserEntitySerializer
from .services import create_entity, deduct_user_entity, update_or_create_user_entity, claim_income
from .selectors import get_all_entities, get_user_entities_by_username
from ..user.serializers import UserProfileSerializer
from ..user.selectors import get_user_by_username

class EntityViewSet(viewsets.ViewSet):
    serializer_class = EntitySerializer

    def list(self, request):
        serializer = self.serializer_class(get_all_entities(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            create_entity(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserEntityViewSet(viewsets.ViewSet):
    serializer_class = UserEntitySerializer

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_entity = get_user_entities_by_username(pk)
                serializer = self.serializer_class(user_entity, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            updated_entities = update_or_create_user_entity(serializer.validated_data)
            serialized_data = self.serializer_class(updated_entities, many=True)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def claim_stacked_income(request):
    username = request.data["user"]
    amount = request.data["amount"]

    if username and amount:
        claim_income(username, int(amount))
        user_profile = get_user_by_username(username)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"Bad Request": "User or amount is not specified"}, status=status.HTTP_400_BAD_REQUEST)
