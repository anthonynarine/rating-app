
from re import U
from rest_framework import viewsets
from rest_framework import  generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication


from .models import User
from .schemas import user_list_docs
from .serializers import UserSerializer, UserSignupSerializer

class UserViewSet(viewsets.ViewSet):
    """
    A ViewSet for viewing users.

    This ViewSet provides the list and retrieve actions.
    """
    queryset = User.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    @user_list_docs
    def list(self, request):
        """
        List all users.

        Retrieves a list of all the users from the database and returns them as a serialized response.

        Args:
            request: The HTTP request object.

        Returns:
            Response containing a serialized list of all users.
        """
        # Query all users
        queryset = User.objects.all()

        # Serialize the queryset
        serializer = UserSerializer(queryset, many=True)
        
        # Return the serialized data as a response
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieve a user by ID.

        Retrieves a specific user by their ID from the database and returns them as a serialized response.
        If the user with the given ID doesn't exist, a "Not Found" error is raised.

        Args:
            request: The HTTP request object.
            pk (int, optional): The primary key (ID) of the user. Defaults to None.

        Returns:
            Response containing the serialized user data.
        """
        try:
            # Query a single user based on the provided primary key (ID)
            user = User.objects.get(id=pk)

            # Serialize the user object
            serializer = UserSerializer(user)
            
            # Return the serialized data as a response
            return Response(serializer.data)
        except User.DoesNotExist:
            # Raise a "Not Found" error if the user doesn't exist
            raise NotFound(detail="User not found")
        
class UserSignupView(generics.CreateAPIView):
    """
    generics
    API endpoint to handle user registration.
    """
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        """
        Overrides the default create method to send a custom response after registration.
        """
        response = super().create(request, *args, **kwargs)
        return Response({"detail": "User registered successfully."})
