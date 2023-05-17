from django.shortcuts import render
from django.conf import settings

# Create your views here.
def searchMap(request):
    context = {
        'KAKAO_KEY': settings.KAKAO_KEY,
    }
    return render(request, 'kakaomaps/map.html', context)