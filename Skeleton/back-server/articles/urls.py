from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.article_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('articles/<int:article_pk>/comments/', views.comment_create),
    path('replies/', views.reply_list),
    path('replies/<int:reply_pk>/', views.reply_detail),
    path('like/toggle/', views.toggle_like),
    path('like/status/<str:obj_type>/<int:obj_id>/', views.get_like_status),
]