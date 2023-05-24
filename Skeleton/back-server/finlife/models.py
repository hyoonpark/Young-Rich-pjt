from django.db import models

# Create your models here.
class DepositProducts(models.Model):
    fin_prdt_cd = models.TextField(unique=True)
    kor_co_nm = models.TextField()
    fin_prdt_nm = models.TextField()
    etc_note = models.TextField()
    join_deny = models.IntegerField()
    join_member = models.TextField()
    join_way = models.TextField()
    spcl_cnd = models.TextField()
    mtrt_int = models.TextField()
    max_limit = models.IntegerField(null=True)
    dcls_strt_day = models.IntegerField(null=True)
    dcls_end_day = models.IntegerField(null=True)
    
class DepositOptions(models.Model):
    fin_prdt_cd = models.ForeignKey(DepositProducts, on_delete=models.CASCADE)
    intr_rate_type_nm = models.CharField(max_length=100)
    intr_rate = models.FloatField(null=True)
    intr_rate2 = models.FloatField()
    save_trm = models.IntegerField()
    
class SavingProducts(models.Model) :
    fin_prdt_cd = models.TextField(unique=True)
    kor_co_nm = models.TextField()
    fin_prdt_nm = models.TextField()
    etc_note = models.TextField()
    join_deny = models.IntegerField()
    join_member = models.TextField()
    join_way = models.TextField()
    spcl_cnd = models.TextField()
    mtrt_int = models.TextField()
    max_limit = models.IntegerField(null=True)
    dcls_strt_day = models.IntegerField(null=True)
    dcls_end_day = models.IntegerField(null=True)
    
class SavingOptions(models.Model) :
    fin_prdt_cd = models.ForeignKey(SavingProducts, on_delete=models.CASCADE)
    intr_rate_type_nm = models.CharField(max_length=100)
    intr_rate = models.FloatField(null=True)
    intr_rate2 = models.FloatField()
    save_trm = models.IntegerField()
    rsrv_type_nm = models.CharField(max_length=100)
    
class FinanceCompany(models.Model) :
    kor_co_nm = models.TextField()
    homp_url = models.TextField()
    cal_tel =  models.IntegerField()