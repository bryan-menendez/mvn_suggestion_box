# Generated by Django 3.2.4 on 2021-06-13 00:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('box', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
        migrations.AddField(
            model_name='suggestion',
            name='cat',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, related_name='suggestions', to='box.category'),
        ),
        migrations.AlterField(
            model_name='suggestion',
            name='desc',
            field=models.TextField(max_length=4096),
        ),
    ]