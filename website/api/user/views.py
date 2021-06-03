from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Skill, UserProfile
from .serializers import SkillSerializer, UserProfileSerializer, BountySerializer, UserRelationshipSerializer
from .services import attack_player_on_bounty, create_bounty, create_user_relationship, get_unclaimed_bounties
from .exceptions import BountyExistError, SameUserError, InsufficientCurrencyError, InsufficientHealthError
from .selectors import get_all_users, get_bounties_by_status, get_list_of_relationships_by_username, get_user_by_abstract_id, get_user_by_username, get_users_by_relationships

class UserProfileViewSet(viewsets.ViewSet):
    serializer_class = UserProfileSerializer

    def get_object(self, pk):
        if pk.isdigit():
            return get_user_by_abstract_id(pk)
        return get_user_by_username(pk)

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_profile = self.get_object(pk=pk)
                serializer = self.serializer_class(user_profile)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except (UserProfile.DoesNotExist, User.DoesNotExist):
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        serializer = self.serializer_class(get_all_users(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserRelationshipViewSet(viewsets.ViewSet):
    serializer_class = UserRelationshipSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                create_user_relationship(serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except SameUserError:
                return Response({"Bad Request": "Unable to befriend yourself"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                relationships = get_list_of_relationships_by_username(pk)
                friend_profiles = get_users_by_relationships(relationships)
                serializer = UserProfileSerializer(friend_profiles, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({"Relationships Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"}, status=status.HTTP_400_BAD_REQUEST)

class SkillViewSet(viewsets.ViewSet):
    serializer_class = SkillSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Skill.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

class BountyViewSet(viewsets.ViewSet):
    serializer_class = BountySerializer

    def create(self, request):
        request_copy = request.data.copy()
        target_name = request.data["target"]
        bounty_value = 100                              # To be computed by a formula to determine player's net worth
        request_copy["value"] = bounty_value
        serializer = self.serializer_class(data=request_copy)

        if serializer.is_valid():
            try:
                create_bounty(serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except SameUserError:
                return Response({"Bad Request": "Unable to place bounty on yourself"}, status=status.HTTP_400_BAD_REQUEST)
            except BountyExistError:
                return Response({"Bad Request": f"{target_name} currently has an existing bounty".format}, status=status.HTTP_400_BAD_REQUEST)
            except InsufficientHealthError:
                return Response({"Bad Request": f"{target_name} is currently dead"}, status=status.HTTP_400_BAD_REQUEST)
            except InsufficientCurrencyError:
                return Response({"Bad Request": f"Insufficient currency to place bounty on {target_name}"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        serializer = self.serializer_class(get_bounties_by_status("UNCLAIMED"), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def partial_update(self, request, pk=None):
        if pk is not None:
            try:
                player_name = request.data["attacker"]
                bounty_id = pk
                damage, target = attack_player_on_bounty(player_name, bounty_id)

                return Response({
                "Success": "{} has been dealt to {}".format(damage, target),
                "bounty": get_unclaimed_bounties()
            }, status=status.HTTP_200_OK)
            except InsufficientHealthError:
                return Response({"Bad Request": "Bounty has already been claimed"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Bounty not specified"}, status=status.HTTP_400_BAD_REQUEST)