# Generated by Django 5.0.4 on 2024-04-20 12:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_alter_event_options_alter_event_general_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='rating',
            new_name='rate',
        ),
    ]
