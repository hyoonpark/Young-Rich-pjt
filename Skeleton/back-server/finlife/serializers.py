from rest_framework import serializers
from .models import DepositProducts, DepositOptions,SavingOptions,SavingProducts

class DepositProductsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DepositProducts
        fields = '__all__'
    
class DepositOptionsSerializer(serializers.ModelSerializer):
    intr_rate = serializers.FloatField(default=-1, allow_null=True)
    
    class Meta:
        model = DepositOptions
        fields = '__all__'
        read_only_fields = ('fin_prdt_cd',)
        
class SavingProductsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SavingProducts
        fields = '__all__'
    
class SavingOptionsSerializer(serializers.ModelSerializer):
    intr_rate = serializers.FloatField(default=-1, allow_null=True)
    
    class Meta:
        model = SavingOptions
        fields = '__all__'
        read_only_fields = ('fin_prdt_cd',)