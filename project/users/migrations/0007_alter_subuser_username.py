# Generated by Django 5.0.4 on 2024-04-07 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_subuser_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subuser',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]