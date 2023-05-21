from rest_framework import serializers
from .models import CustomUser,InterestProduct

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'age', 'assets', 'salary']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class InterestProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestProduct
        fields = ['product_type','kor_co_nm' ,'fin_prdt_nm', 'save_trm']