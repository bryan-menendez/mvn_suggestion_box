# Generated by Django 3.1.5 on 2021-06-19 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('box', '0003_auto_20210614_1015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='suggestion',
            name='desc',
            field=models.TextField(default='Sin descripcion', max_length=4096),
        ),
        migrations.AlterField(
            model_name='suggestion',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='suggestion',
            name='username',
            field=models.CharField(default='Anonimo', max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='vote',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]