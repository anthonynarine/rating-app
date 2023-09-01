
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
    @action(detail=True, methods=["POST"])
    def test_rate_movie(self, request, pk=None):
        if "stars" in request.data:
            movie = get_object_or_404(Movie, id=pk)
            stars = request.data["stars"]
            user = request.user
            user = User.objects.get(id=1)
            print(f"id is {pk}, movie tile, {movie.title}")
            
            try:
                rating = Rating.objects.get(user=user.id, movie=movie.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {"message": "Rating updated", "result": serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except Rating.DoesNotExist:         
                rating = Rating.objects.create(user=user, movie=movie, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                response = {"message": "Rating created", "result": serializer.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {"message": "you need to provide stars"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
