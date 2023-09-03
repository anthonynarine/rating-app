
from django.contrib import admin
from django.urls import path
from django.conf.urls import include

#Auth
from rest_framework.authtoken.views import obtain_auth_token

# ApiDocumentation
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
    path('auth/', obtain_auth_token),
]


schema_patterns = [
    # YOUR PATTERNS
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

urlpatterns += schema_patterns
