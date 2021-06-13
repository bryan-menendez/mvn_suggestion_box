from django.contrib import admin
from django.db import models
from .models import Suggestion, Vote, Category
from django.forms import TextInput, Textarea


class SuggestionAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'80'})},
        models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':80})},
    }


# Register your models here.
admin.site.register(Suggestion, SuggestionAdmin)
admin.site.register(Vote)
admin.site.register(Category)
