from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    age = models.IntegerField()
    assets = models.IntegerField()
    salary = models.IntegerField()


class InterestProduct(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_type = models.IntegerField()
    kor_co_nm = models.TextField()
    fin_prdt_nm = models.TextField()
    save_trm = models.IntegerField()

