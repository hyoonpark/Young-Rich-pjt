from django.urls import path
from finlife import views

urlpatterns = [
    path('save-deposit-products/', views.save_deposit_products),
    path('deposit-products/', views.deposit_products),
    path('deposit-product-options/<str:fin_prdt_cd>/', views.deposit_product_options),
    path('deposit-products/top_rate/', views.deposit_top_rate),
    path('save-saving-products/', views.save_saving_products),
    path('saving-products/', views.saving_products),
    path('saving-product-options/<str:fin_prdt_cd>/', views.saving_product_options),
    path('saving-products/top_rate/', views.saving_top_rate),
    path('save-finance-company/', views.save_finance_company),
    path('finance-company/', views.finance_company),
]