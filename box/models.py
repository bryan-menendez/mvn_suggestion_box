from django.db import models


class Suggestion(models.Model):
    title = models.CharField(max_length=1024)
    desc = models.TextField(max_length=4096, default="Sin descripcion")
    date = models.DateField(auto_now_add=True)
    username = models.CharField(max_length=1024, default="Anonimo")
    is_implemented = models.BooleanField(default=False)
    cat = models.ForeignKey('box.Category', default=None, related_name='suggestions', on_delete=models.DO_NOTHING)

    def __str__(self):
            return self.cat.title + " - " + self.title


class Category(models.Model):
    icon = models.CharField(max_length=1024 , blank=True, default="")
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
            return str(self.id) + " - " + self.title


class Vote(models.Model):
    owner = models.ForeignKey('auth.User', default=None, related_name='votes', on_delete=models.DO_NOTHING)
    suggestion = models.ForeignKey(Suggestion, default=None, related_name='votes', on_delete=models.DO_NOTHING)

    def __str__(self):
            return self.username + " liked " + str(self.suggestion.id) + " - " + self.suggestion.title