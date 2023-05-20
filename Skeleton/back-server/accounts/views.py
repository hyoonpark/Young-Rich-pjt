from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer


class CreateUser(APIView):
    def get(self, request):
        # GET 요청에 대한 응답 처리
        return Response({'message': 'GET 요청을 처리합니다.'})
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
   
        if serializer.is_valid():
            serializer.save()
            return Response({'message': '회원 가입이 완료되었습니다.'})
        return Response(serializer.errors, status=400)

class LoginUser(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            
            serializer = UserSerializer(user)
            user_data = serializer.data
            user_data['token'] = token.key
            print(user_data)
            return Response(user_data)
        else:
            return Response({'error': 'Invalid credentials'}, status=400)