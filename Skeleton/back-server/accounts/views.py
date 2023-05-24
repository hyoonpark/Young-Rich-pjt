from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer,InterestProductSerializer
from .models import InterestProduct


@api_view(['GET', 'POST'])
def CreateUser(request):
    if request.method == 'GET':
        # GET 요청에 대한 응답 처리
        return Response({'message': 'GET 요청을 처리합니다.'})
    
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
   
        if serializer.is_valid():
            serializer.save()
            return Response({'message': '회원 가입이 완료되었습니다.'})
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def LoginUser(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        
        serializer = UserSerializer(user)
        user_data = serializer.data
        user_data['token'] = token.key
        
        return Response(user_data)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)
        
@api_view(['PUT'])
def update_profile(request):
    # Get the user from the authenticated request
    user = request.user
    # Get the profile data from the request payload
    username = request.data.get('username')
    email = request.data.get('email')
    age = request.data.get('age')
    assets = request.data.get('assets')
    salary = request.data.get('salary')
    
    # Update the user profile data
    user_data = {
        'username': username,
        'email': email,
        'age': age,
        'assets': assets,
        'salary': salary,
 
    }
    
    serializer = UserSerializer(user, data=user_data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': '프로필 수정이 완료되었습니다.'})
    else:
        print(serializer)
        return Response(serializer.errors, status=400)
    
@api_view(['POST','DELETE'])
def interest_product(request):

    user = request.user
    product_data = request.data
  
    if request.method == "POST" :
        
        # 이미 등록된 상품인지 확인
        existing_product = InterestProduct.objects.filter(user=user, **product_data).exists()
        if existing_product:
            return Response(status=409)

        serializer = InterestProductSerializer(data=product_data)
       
        if serializer.is_valid():
            serializer.save(user=user)
         
            return Response({'message': '관심 상품이 등록되었습니다!'})

        return Response(serializer.errors, status=400)
    elif request.method == "DELETE":

        try:
           
            product = InterestProduct.objects.get(user=user, product_type=product_data['product_type'], fin_prdt_nm=product_data['fin_prdt_nm'], save_trm=product_data['save_trm'])
            product.delete()
            return Response({'message': '관심 상품 등록이 해제되었습니다!'})
        except :
            return Response(status=404)

@api_view(['POST'])
def check_interest(request):

    user = request.user
    product_data = request.data
        
    existing_product = InterestProduct.objects.filter(user=user, **product_data).exists()
    if existing_product:
        return Response(status=409)

    else :
        return Response({'message': '등록되지 않은 상품!'})
    

@api_view(['POST'])
def get_interest(request):
    
    user_id = request.user.id
    product_type = request.data.get('product_type')
    
    # 필터링된 데이터를 가져옴
    if product_type == 1:
        filtered_products = InterestProduct.objects.filter(product_type=1, user_id=user_id)
    else:
        filtered_products = InterestProduct.objects.filter(product_type=2, user_id=user_id)
    
    # Serializer를 사용하여 데이터 직렬화
    serializer = InterestProductSerializer(filtered_products, many=True)

    return Response(serializer.data)