from django.shortcuts import render
from .models import Category, Suggestion

def index(request):
    categories = Category.objects.all()

    context = {
        'categories' : categories
    }

    return render(request, 'box/index.html', context)