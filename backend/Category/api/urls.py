from django.urls import path

from Category.api.views import (
    add_new_category,
    get_user_categories_view,
)

app_name = 'Category'

urlpatterns = [
    path('new_category', add_new_category, name="CreateNewCategory"),
    path('user_categories', get_user_categories_view, name="GetUserCategories"),
]
