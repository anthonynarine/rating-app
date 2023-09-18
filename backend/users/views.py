
from re import U
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import User
from .schemas import user_list_docs
from .serializers import UserSerializer

class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    @user_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        queryset = User.objects.get(id=user_id)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)