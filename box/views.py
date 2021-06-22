from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Category, Suggestion
from .serializers import SuggestionSerializer
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

def index(request):
    categories = Category.objects.all()

    context = {
        'categories' : categories
    }

    return render(request, 'box/index.html', context)


class SuggestionCreate(APIView):
    serializer_class = SuggestionSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            cat_id = serializer.data.get('cat')
            cat = Category.objects.filter(id=cat_id).first()
            username = serializer.data.get('username')
            title = serializer.data.get('title')
            desc = serializer.data.get('desc')

            if username is None or username == "":
                username = "Anonimo"

            if desc is None or desc == "":
                desc = "Sin descripcion"

            sug = Suggestion(cat=cat, title=title, username=username, desc=desc)
            sug.save()

            return Response(status=status.HTTP_201_CREATED)

        return JsonResponse({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)