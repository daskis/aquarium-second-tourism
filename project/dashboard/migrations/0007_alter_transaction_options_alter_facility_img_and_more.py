# Generated by Django 5.0.4 on 2024-04-20 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0006_alter_transaction_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='transaction',
            options={'ordering': ['-date']},
        ),
        migrations.AlterField(
            model_name='facility',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='img/'),
        ),
        migrations.AlterField(
            model_name='travel',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='img/'),
        ),
    ]
