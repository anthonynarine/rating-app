from rest_framework import serializers
from .models import Movie, Rating

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
    class Meta:
        model = Rating
        fields = "__all__"

