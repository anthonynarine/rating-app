from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserViewSet(viewsets.ModelViewSet):
    """API endpoint for managing User objects."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MovieViewSet(viewsets.ModelViewSet):
    """API endpoint for managing Movie objects."""
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    
    @action(detail=True, methods=["POST"])
    def rate_movie(self, request, pk=None):
        """
        Rate a movie with stars. Requires 'stars' field in request data.
        
        Args:
            request (Request): The HTTP request object.
            pk (int): The primary key of the movie.
            
        Returns:
            Response: The response containing the result of the rating operation.
        """
        if "stars" in request.data:
            movie = Movie.objects.get(id=pk)
            stars = request.data["stars"]
            user = request.user
            
            # Example: Logging user and movie information
            print(f"User: {user}")
            print(f"Movie: {movie.title}, Stars: {stars}")
            
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
            response = {"message": "You need to provide stars"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        

class RatingViewSet(viewsets.ModelViewSet):
    """API endpoint for managing Rating objects."""
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        """
        Update operation is not allowed for Ratings.
        
        Args:
            request (Request): The HTTP request object.
            
        Returns:
            Response: The response indicating that the update operation is not allowed.
        """
        response = {"message": "Cannot update this way"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def create(self, request, *args, **kwargs):
        """
        Create operation is not allowed for Ratings.
        
        Args:
            request (Request): The HTTP request object.
            
        Returns:
            Response: The response indicating that the create operation is not allowed.
        """
        response = {"message": "Cannot create this way"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
