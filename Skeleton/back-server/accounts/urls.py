from django.urls import path
from .views import *

urlpatterns = [
    path('create-user/', CreateUser.as_view(), name='create_user'),
    path('login/',LoginUser.as_view(),name='login')
]