from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import UserViewSet, UserSignupView


router = routers.DefaultRouter()
router.register("users", UserViewSet)
# router.register("signup", UserSignupView) will only work with viewsets not generics

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', UserSignupView.as_view(), name='signup'),
]
