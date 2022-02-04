from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from Category.api.serializers import CategorySerializer
from Mappings.models import CategoryUserMapping

@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
def add_new_category(request):
    #checks

    data = {}
    user = request.user # gets user id
    serializer = CategorySerializer(data=request.data)

    if serializer.is_valid():
        new_category = serializer.save()
        category_user_map = CategoryUserMapping(category_id= new_category, user_id=user)
        # check if category name unique for user
        category_user_map.save()
        data['message'] = 'Category Added'
        data['status'] = 'success'
    else:
        data['status'] = 'failure'

    return Response(data)

@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def get_user_categories_view(request):
    data = {}
    user = request.user
    print(user.id)
    if user:
        categories = get_user_categories(user.id)
        data["category_count"] = len(categories)
        data["categories"] = categories
        data["status"] = "success"
    else:
        data["status"] = "failure"

    return Response(data)


def get_user_categories(user_id):
    print(user_id)
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT C."CategoryName", C."Type", C."Color", C."Description"
            FROM "Mappings_categoryusermapping" M, "Category_category" C
            WHERE M."UserID" = {user_id} AND M."CategoryID"=C."CategoryID";'''
        )
        categories = cursor.fetchall()
        cursor.close()

    categories_data = []
    for category in categories: # pack data to dictionary
        category_data = {}
        category_data['category_name'] = category[0]
        category_data['category_type'] = category[1]
        category_data['color'] = category[2]
        category_data['description'] = category[3]

        categories_data.append(category_data)

    return categories_data



