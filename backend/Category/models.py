from django.db import models

# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name_plural = 'Categories'

    DEFAULT_COLOR = '#FFFFFF'
    category_id = models.AutoField(verbose_name="CategoryID", primary_key=True, db_column="CategoryID")
    category_name = models.CharField(max_length=30, db_column="CategoryName")
    category_type = models.CharField(max_length=25, blank=True, db_column="Type")
    color = models.CharField(max_length=10, default=DEFAULT_COLOR, db_column="Color")
    description = models.TextField(max_length=500,blank=True, null=True, db_column="Description")

    def __str__(self) -> str:
        return self.category_name
