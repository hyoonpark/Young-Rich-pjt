from django.shortcuts import render, redirect, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import DepositProducts, DepositOptions,SavingProducts,SavingOptions
from .serializers import DepositProductsSerializer, DepositOptionsSerializer,SavingOptionsSerializer,SavingProductsSerializer
from django.views.decorators.http import require_http_methods
from rest_framework import status
from django.conf import settings
import requests

API_KEY = settings.API_KEY

BASE_URL = 'http://finlife.fss.or.kr/finlifeapi/'

# Create your views here.
@api_view(['GET'])
def save_deposit_products(request):
    URL = BASE_URL + 'depositProductsSearch.json'
    params = {
        'auth': settings.API_KEY,
        'topFinGrpNo': '020000',
        'pageNo': 1,
    }
    response = requests.get(URL, params=params).json()

    data = response['result']['baseList']
    for product in data:
        serializer = DepositProductsSerializer(data=product)
        if serializer.is_valid(raise_exception=True):
            product_obj = serializer.save()

        fin_prdt_cd = product['fin_prdt_cd']
        depositProduct = get_object_or_404(DepositProducts, fin_prdt_cd=fin_prdt_cd)
        
        options = response['result']['optionList']
        for option in options:
            if option['fin_prdt_cd'] == fin_prdt_cd:
                option.setdefault('intr_rate', -1)
                # option['fin_prdt_cd'] = product_obj.id
                option_serializer = DepositOptionsSerializer(data=option)
                if option_serializer.is_valid(raise_exception=True):
                    option_serializer.save(fin_prdt_cd=depositProduct)

    products = DepositProducts.objects.all()
    serializer = DepositProductsSerializer(products, many=True)

    options = DepositOptions.objects.all()
    serializer = DepositOptionsSerializer(options, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def deposit_products(request):
    if request.method == 'GET':
        products = DepositProducts.objects.all()
        serializer = DepositProductsSerializer(products, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = DepositProductsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
def deposit_product_options(request, fin_prdt_cd):
    product = DepositProducts.objects.filter(fin_prdt_cd=fin_prdt_cd).first()
    if not product:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        options = DepositOptions.objects.filter(fin_prdt_cd=product)
        serializer = DepositOptionsSerializer(options, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def deposit_top_rate(request):
    option = DepositOptions.objects.order_by('-intr_rate2').first()
    if not option:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        product = option.fin_prdt_cd
        product_serializer = DepositProductsSerializer(product)
        option_serializer = DepositOptionsSerializer(option)
        
        data = {
            'product': product_serializer.data,
            'option': option_serializer.data,
        }
    
    return Response(data)


@api_view(['GET'])
def save_saving_products(request):
    URLS = BASE_URL + 'savingProductsSearch.json'
    params = {
        'auth': settings.API_KEY,
        'topFinGrpNo': '020000',
        'pageNo': 1,
    }
    response = requests.get(URLS, params=params).json()
    data = response['result']['baseList']
    for product in data:
        serializer = SavingProductsSerializer(data=product)
        if serializer.is_valid(raise_exception=True):
            product_obj = serializer.save()

        fin_prdt_cd = product['fin_prdt_cd']
        savingproduct = get_object_or_404(SavingProducts, fin_prdt_cd=fin_prdt_cd)
        
        options = response['result']['optionList']
        for option in options:
            if option['fin_prdt_cd'] == fin_prdt_cd:
                option.setdefault('intr_rate', -1)
                # option['fin_prdt_cd'] = product_obj.id
                option_serializer = SavingOptionsSerializer(data=option)
                if option_serializer.is_valid(raise_exception=True):
                    option_serializer.save(fin_prdt_cd=savingproduct)

    products = SavingProducts.objects.all()
    serializer = SavingProductsSerializer(products, many=True)

    options = SavingOptions.objects.all()
    serializer = SavingOptionsSerializer(options, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def saving_products(request):
    if request.method == 'GET':
        products = SavingProducts.objects.all()
        serializer = SavingProductsSerializer(products, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SavingProductsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
def saving_product_options(request, fin_prdt_cd):
    product = SavingProducts.objects.filter(fin_prdt_cd=fin_prdt_cd).first()
    if not product:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        options = SavingOptions.objects.filter(fin_prdt_cd=product)
        serializer = SavingOptionsSerializer(options, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def saving_top_rate(request):
    option = SavingOptions.objects.order_by('-intr_rate2').first()
    if not option:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        product = option.fin_prdt_cd
        product_serializer = SavingProductsSerializer(product)
        option_serializer = SavingOptionsSerializer(option)
        
        data = {
            'product': product_serializer.data,
            'option': option_serializer.data,
        }
    
    return Response(data)

