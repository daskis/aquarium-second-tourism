# Generated by Django 5.0.4 on 2024-04-20 03:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_rename_service_stock_services'),
    ]

    operations = [
        migrations.RenameField(
            model_name='loyality',
            old_name='service',
            new_name='services',
        ),
    ]
