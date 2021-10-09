from django.urls import path
from django.urls.conf import include
from rest_framework import routers, urlpatterns
from ..models import Image
from .views import ImageViewSet

app_name = 'api-images'

router = routers.DefaultRouter()
router.register(r'images', ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]