
from rest_framework import serializers
from .models import Movie, Rating
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]  # password needs to be hashed
        extra_kwargs = {"password": {"write_only": True, "required": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
       

class MovieSerializer(serializers.ModelSerializer):
    # serialize model functions
    num_of_ratings = serializers.SerializerMethodField()
    avg_rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = "__all__"

    def get_num_of_ratings(self, obj):
        return obj.num_of_ratings()

    def get_avg_rating(self, obj):
        return obj.avg_rating()


class RatingSerializer(serializers.ModelSerializer):
    movie = (
        serializers.StringRelatedField()
    )  # This will display the movie title instead of ID

    class Meta:
        model = Rating
        fields = "__all__"
