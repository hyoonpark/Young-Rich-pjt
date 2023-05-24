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
    etc_note = models.TextField()
    join_member = models.TextField()
    join_way = models.TextField()
    spcl_cnd = models.TextField()
    mtrt_int = models.TextField()
    max_limit = models.IntegerField(null=True)
    dcls_strt_day = models.IntegerField(null=True)
    dcls_end_day = models.IntegerField(null=True)
    intr_rate_type_nm = models.CharField(max_length=100)
    intr_rate = models.FloatField(null=True)
    intr_rate2 = models.FloatField(null=True)