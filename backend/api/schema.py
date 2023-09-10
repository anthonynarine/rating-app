from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .serializers import MovieSerializer, RatingSerializer

movie_list_docs = extend_schema(
    responses=MovieSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="title",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter movies by title. If this parameter is provided, only movies with this title will be returned.",
        ),
        OpenApiParameter(
            name="genre",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter movies by genre. If this parameter is provided, only movies with this genre will be returned.",
        ),
    ],
)

rating_list_docs = extend_schema(
    responses=RatingSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="movie_title",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter ratings by movie title. If this parameter is provided, only ratings for the specified movie will be returned.",
        ),
        OpenApiParameter(
            name="user",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter ratings by username. If this parameter is provided, only ratings made by this user will be returned.",
        ),
    ],
)
