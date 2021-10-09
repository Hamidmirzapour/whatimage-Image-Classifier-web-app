from re import I
from rest_framework import fields, serializers
from ..models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'