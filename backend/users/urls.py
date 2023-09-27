from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import UserSignupView, UserViewSet

router = routers.DefaultRouter()
router.register("users", UserViewSet)
# router.register("signup", UserSignupView) will only work with viewsets not generics

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', UserSignupView.as_view(), name='signup'),
]


# In project's urls.py, you have included the users/urls.py like this:
# path("api/", include("users.urls")),
# To access the user registration endpoint, you should use the following URL
# http://127.0.0.1:8000/api/signup/

