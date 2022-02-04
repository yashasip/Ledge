from django.db import models

# Create your models here.
class Currency(models.Model):
    class Meta:
        verbose_name_plural = 'Currencies'
    
    CURRENCY_TYPE_CHOICES = [
        ('FIAT', 'Fiat'),
        ('CRYPTO', 'Crypto'),
    ]

    currency_id = models.AutoField(verbose_name="CurrencyID",primary_key=True,db_column="CurrencyID")
    currency_symbol = models.CharField(max_length=5, null=True, db_column="Symbol")
    currency_code = models.CharField(max_length=5, unique=True,db_column="Code")
    type = models.CharField(choices=CURRENCY_TYPE_CHOICES,max_length=10,default='FIAT', db_column="Type")

    def __str__(self) -> str:
        return self.currency_code
