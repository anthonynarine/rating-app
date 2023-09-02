import imp
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import MovieSerializer, RatingSerializer, UserSerializer


list_movie_docs = extend_schema(
    responses=MovieSerializer(many=True),
    parameters=[
        OpenApiParameter(
            ...
        )
        
    ]
    
)