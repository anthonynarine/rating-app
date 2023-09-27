
from rest_framework import viewsets
from rest_framework import  generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import authentication_classes, permission_classes
from django.shortcuts import get_object_or_404


from .models import User
from .schemas import user_list_docs
from .serializers import UserSerializer, UserSignupSerializer

   

class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# FOR DEBUGGING       
# import pdb
# import logging
# logger = logging.getLogger(__name__)

class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        # logger.debug("Entering create method")  # Use logger for debugging
        # pdb.set_trace()  # Set a breakpoint for debugging
        response = super().create(request, *args, **kwargs)
        return Response({"detail": "User registered successfully."})
    




