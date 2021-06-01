from collections import OrderedDict
from django.db.models.expressions import F
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Bounty, UserRelationship, Character
from .serializers import UserProfileSerializer, CharacterSerializer, BountySerializer, UserRelationshipSerializer
from ..formulas.battle import damage_dealt

class CharacterViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Character.objects.all()
        serializer = CharacterSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileViewSet(viewsets.ViewSet):
    serializer_class = UserProfileSerializer

    def get_object(self, pk):
        if pk.isdigit():
            user = User.objects.get(id=pk)
            return UserProfile.objects.get(user=user)
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

class BountyViewSet(viewsets.ViewSet):
    serializer_class = BountySerializer

    def create(self, request):
        request_copy = request.data.copy()
        placed_by = request.data["placed_by"]
        target = request.data["target"]

        if placed_by == target:
            return Response({"Bad Request": "Unable to place bounty on yourself"}, status=status.HTTP_400_BAD_REQUEST)
        
        if Bounty.objects.filter(target=target, status="UNCLAIMED").count() != 0:
            return Response({"Bad Request": f"{target} currently has an existing bounty"}, status=status.HTTP_400_BAD_REQUEST)
        
        if UserProfile.objects.get(user_id=target).current_health == 0:
            return Response({"Bad Request": f"{target} is currently dead"}, status=status.HTTP_400_BAD_REQUEST)

        bounty_value = 100                          # To be computed by a formula to determine player's net worth
        player = UserProfile.objects.get(user_id=placed_by)

        if player.currency > bounty_value:
            request_copy["value"] = bounty_value                        # Insert bounty value in request data
            serializer = self.serializer_class(data=request_copy)
            player.currency = F("currency") - bounty_value
            player.save()

            if serializer.is_valid():
                Bounty.objects.create(**serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": f"Insufficient currency to place bounty on {target}"}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = Bounty.objects.filter(status="UNCLAIMED")
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def partial_update(self, request, pk=None):
        if pk is not None:
            data = request.data
            bounty = Bounty.objects.get(id=pk)
            target = bounty.target
            
            if target.current_health != 0:
                attacker = UserProfile.objects.get(user_id=data["attacker"])
                damage = damage_dealt(attacker.attack, attacker.defence)
                if target.current_health - damage > 0:
                    target.current_health = F("current_health") - damage
                else:
                    target.current_health = 0
                    bounty.status = "CLAIMED"
                    bounty.claimed_by = attacker
                    attacker.currency = F("currency") + bounty.value
                    attacker.save()
                bounty.save()
                target.save()

                bounty_queryset = Bounty.objects.filter(status="UNCLAIMED")
                bounty_serializer = BountySerializer(bounty_queryset, many=True)
                bounty_dict = [dict(OrderedDict(bounty)) for bounty in bounty_serializer.data]
                return Response({
                    "Success": "{} has been dealt to {}".format(damage, target),
                    "bounty": bounty_dict
                }, status=status.HTTP_200_OK)
            return Response({"Bad Request": "Bounty on {} has already been claimed".format(data["bounty"]["target"])}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Bounty not specified"}, status=status.HTTP_400_BAD_REQUEST)