# Generated by Django 5.0.4 on 2024-04-19 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='experience',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='owner',
            name='level',
            field=models.IntegerField(default=1),
        ),
    ]
