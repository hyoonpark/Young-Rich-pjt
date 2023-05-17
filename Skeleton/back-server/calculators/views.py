from django.shortcuts import render
from django.conf import settings
# import requests

# Create your views here.
def currencyCalc(request):
    context = {
        'CURRENCY_KEY': settings.CURRENCY_KEY,
    }
    return render(request, 'calculators/calculator.html', context)