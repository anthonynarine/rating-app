from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .schema import movie_list_docs, rating_list_docs
from rest_framework.mixins import ListModelMixin 
from users.schemas import user_list_docs

# Get the User model
User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """API endpoint for managing User objects."""
    queryset = User.objects.all()
    serializer_class = UserSerializer 

    @user_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        user_instance = User.objects.get(id=user_id)
        serializer = UserSerializer(user_instance)
        return Response(serializer.data)

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    
    @movie_list_docs
    def list(self, request, *args, **kwargs):
        return ListModelMixin.list(self, request, *args, **kwargs)
    
    @action(detail=True, methods=["POST"])
    def rate_movie(self, request, pk=None):
        if "stars" in request.data:
            movie = Movie.objects.get(id=pk)
            stars = request.data["stars"]
            user = request.user
            
            print(f"User: {user}")
            print(f"Movie: {movie.title}, Stars: {stars}")
            
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
            response = {"message": "You need to provide stars"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

class RatingViewSet(viewsets.ModelViewSet):
    """API endpoint for managing Rating objects."""
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    
    @rating_list_docs
    def list(self, request, *args, **kwargs):
        return ListModelMixin.list(self, request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        response = {"message": "Cannot update this way"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def create(self, request, *args, **kwargs):
        response = {"message": "Cannot create this way"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
