

from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, )
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication, )
    
    @action(detail=True, methods=["POST"])
    def rate_movie(self, request, pk=None):
        if "stars" in request.data:
            
            movie = Movie.objects.get(id=pk)
            stars = request.data["stars"]
            user = request.user
            print("User:", user)
            print("User:", request.auth)
            # user = User.objects.get(id=1)
            print(f"id is {pk}, movie tile, {movie.title}, user: {user}")
            if not isinstance(user, User):
                response = {"message": "User must be authenticated to rate movies."}
                return Response(response, status=status.HTTP_401_UNAUTHORIZED)
            
            try:
                rating = Rating.objects.get(user=user, movie=movie.id)
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
    authentication_classes = (TokenAuthentication, )
