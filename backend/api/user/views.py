from collections import OrderedDict
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import UserProfile
from .serializers import UserProfileSerializer, BountySerializer, UserRelationshipSerializer
from .services import attack_player_on_bounty, create_bounty, create_user_relationship, get_unclaimed_bounties, get_user_net_worth
from .exceptions import BountyExistError, SameUserError, InsufficientCurrencyError, InsufficientHealthError
from .selectors import get_all_users, get_bounties_by_status, get_list_of_relationships_by_username, get_user_by_user_id, get_user_by_username, get_users_by_relationships, get_x_random_users

class UserProfileDetail(views.APIView):
    def get_object(self, pk):
        if pk.isdigit():
            return get_user_by_user_id(pk)
        return get_user_by_username(pk)

    def get(self, request, pk=None, format=None):
        if pk is not None:
            try:
                user_profile = self.get_object(pk=pk)
                serializer = UserProfileSerializer(user_profile)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except (UserProfile.DoesNotExist, User.DoesNotExist):
                return Response({
                    "message": "User profile does not exist",
                }, status=status.HTTP_404_NOT_FOUND)
        return Response({
            "message": "Username parameter not specified",
        }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileList(views.APIView):
    def get(self, request, format=None):
        serializer = UserProfileSerializer(get_all_users(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRelationshipCreate(views.APIView):
    def post(self, request, format=None):
        serializer = UserRelationshipSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user_from = request.data.get("user_from")
                user_to = request.data.get("user_to")
                create_user_relationship(serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except SameUserError:
                return Response({
                    "message": "Unable to befriend yourself",
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "message": serializer.error_messages,
        }, status=status.HTTP_400_BAD_REQUEST)


class UserRelationshipDetail(views.APIView):
    def get(self, request, pk=None, format=None):
        if pk is not None:
            try:
                relationships = get_list_of_relationships_by_username(pk)
                friend_profiles = get_users_by_relationships(relationships)

                serializer = UserProfileSerializer(friend_profiles, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({
                    "message": f"Unable to find relationships for {pk}",
                }, status=status.HTTP_404_NOT_FOUND)
        return Response({
            "message": "Username parameter not specified",
        }, status=status.HTTP_400_BAD_REQUEST)


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


class BountyListCreate(views.APIView):
    def get(self, request, format=None):
        """
            Retrieves unclaimed buonties and 10 random players
        """
        bounty_serializer = BountySerializer(get_bounties_by_status("UNCLAIMED"), many=True)
        player_serializer = UserProfileSerializer(get_x_random_users(10), many=True)
        bounty_data = [dict(OrderedDict(bounty)) for bounty in bounty_serializer.data]
        player_data = [dict(OrderedDict(player)) for player in player_serializer.data]
        data = {
            "bounty": bounty_data,
            "player": player_data
        }

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        request_copy = request.data.copy()              # Deep clone a copy of request data
        target_name = request.data["target"]
        target = get_user_by_username(target_name)
        bounty_value = get_user_net_worth(target.user.username)       # To be computed by a formula to determine player's net worth
        request_copy["value"] = bounty_value
        serializer = BountySerializer(data=request_copy)

        if serializer.is_valid():
            try:
                create_bounty(serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except SameUserError:
                return Response({
                    "message": "Unable to place bounty on yourself",
                }, status=status.HTTP_400_BAD_REQUEST)
            except BountyExistError:
                return Response({
                    "message": f"{target_name} currently has an existing bounty",
                }, status=status.HTTP_400_BAD_REQUEST)
            except InsufficientHealthError:
                return Response({
                    "message": f"{target_name} is currently dead",
                }, status=status.HTTP_400_BAD_REQUEST)
            except InsufficientCurrencyError:
                return Response({
                    "message": f"Insufficient currency to place bounty on {target_name}",
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


class BountyPatch(views.APIView):
    def patch(self, request, pk=None, format=None):
        if pk is not None:
            try:
                player_name = request.data["attacker"]
                bounty_id = pk
                damage, currency, exp, target = attack_player_on_bounty(player_name, bounty_id)

                return Response({
                    "rewards": {
                        "target": target,
                        "damage": damage,
                        "currency": currency,
                        "experience": exp
                    },
                    "bounty": get_unclaimed_bounties(),
                }, status=status.HTTP_200_OK)
            except InsufficientHealthError:
                return Response({
                    "message": "Bounty has already been claimed",
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "message": "Bounty parameter not specified",
        }, status=status.HTTP_400_BAD_REQUEST)


class BountyViewSet(viewsets.ViewSet):
    serializer_class = BountySerializer

    def create(self, request):
        request_copy = request.data.copy()
        target_name = request.data["target"]
        target = get_user_by_username(target_name)
        bounty_value = get_user_net_worth(target.username)                          # To be computed by a formula to determine player's net worth
        request_copy["value"] = bounty_value
        serializer = self.serializer_class(data=request_copy)

        if serializer.is_valid():
            create_bounty(serializer.validated_data)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)