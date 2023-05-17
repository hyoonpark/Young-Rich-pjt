from django.urls import path
from . import views

urlpatterns = [
    path('', views.searchMap, name="searchmap")
]