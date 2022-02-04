from rest_framework import serializers
from Category.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name','category_type','color','description']