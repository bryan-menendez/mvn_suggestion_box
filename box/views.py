from django.shortcuts import render
from .models import Category, Suggestion
from .serializers import SuggestionSerializer
from rest_framework import generics, status
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
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            cat_id = serializer.data.get('cat')
            cat = Category.objects.filter(id=cat_id).first()
            username = serializer.data.get('username')
            title = serializer.data.get('title')
            desc = serializer.data.get('desc')

        
            sug = Suggestion(cat=cat, title=title, username=username, desc=desc)
            sug.save()

            return Response(SuggestionSerializer(sug).data, status.HTTP_201_CREATED)

        return Response(status.HTTP_400_BAD_REQUEST)