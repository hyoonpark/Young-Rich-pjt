from django.urls import path
from .views import *

urlpatterns = [
    path('create-user/', CreateUser, name='createuser'),
    path('login/',LoginUser,name='login'),
    path('updateprofile/',update_profile,name='updateprofile'),
    path('update_interest_product/',interest_product,name='updateinterestproduct'),
    path('check_interest/',check_interest,name='checkinterest'),
    path('get_interest/',get_interest,name='getinterest'),
]