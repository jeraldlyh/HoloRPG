from django.db.models.expressions import F
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Skill, UserProfile, Bounty, UserRelationship
from .serializers import SkillSerializer, UserProfileSerializer, BountySerializer, UserRelationshipSerializer
from .services import attack_player_on_bounty, attack_target, claim_bounty, create_bounty, deduct_player_currency, get_unclaimed_bounties
from .exceptions import BountyExist, BountyOnSameUser, InsufficientCurrency, InsufficientHealth

class UserProfileViewSet(viewsets.ViewSet):
    serializer_class = UserProfileSerializer

    def get_object(self, pk):
        if pk.isdigit():
            return UserProfile.objects.get(user__id=pk)
        return UserProfile.objects.get(user=pk)

    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                user_profile = self.get_object(pk=pk)
                serializer = self.serializer_class(user_profile)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except (UserProfile.DoesNotExist, User.DoesNotExist):
                return Response({"Profile Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"})

    def list(self, request):
        queryset = UserProfile.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserRelationshipViewSet(viewsets.ViewSet):
    serializer_class = UserRelationshipSerializer

    def create(self, request):
        if request.data["user_from"][0] == request.data["user_to"][0]:
            return Response({"Bad Request": "Unable to befriend yourself"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserRelationship.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        if pk is not None:
            try:
                relationships = UserRelationship.objects.filter(user_from__user_id=pk).values_list("user_to")
                friend_profiles = UserProfile.objects.filter(id__in=relationships)
                serializer = UserProfileSerializer(friend_profiles, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({"Relationships Not Found": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Username parameter not specified"})

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

        try:
            serializer = self.serializer_class(data=request_copy)
            if serializer.is_valid():
                create_bounty(serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
        except BountyOnSameUser:
            return Response({"Bad Request": "Unable to place bounty on yourself"}, status=status.HTTP_400_BAD_REQUEST)
        except BountyExist:
            return Response({"Bad Request": f"{target_name} currently has an existing bounty".format}, status=status.HTTP_400_BAD_REQUEST)
        except InsufficientHealth:
            return Response({"Bad Request": f"{target_name} is currently dead"}, status=status.HTTP_400_BAD_REQUEST)
        except InsufficientCurrency:
            return Response({"Bad Request": f"Insufficient currency to place bounty on {target_name}"}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = Bounty.objects.filter(status="UNCLAIMED")
        serializer = self.serializer_class(queryset, many=True)
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
            except InsufficientHealth:
                return Response({"Bad Request": "Bounty has already been claimed"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Bounty not specified"}, status=status.HTTP_400_BAD_REQUEST)