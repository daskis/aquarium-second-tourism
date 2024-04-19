from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User, AbstractUser


class Owner(AbstractUser):
    name = models.CharField(max_length=100)
    experience = models.IntegerField()
    phone = models.CharField(max_length=100)
    level = models.IntegerField()
    vipstatus = models.CharField(choices=[('standart', 'standart'), ('gold', 'gold'), ('platinum', 'platinum')], max_length=100)


class Facility(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    coordinates = models.JSONField(default=dict)

    def clean(self):
        if self.coordinates and (
                'latitude' not in self.coordinates or 'longitude' not in self.coordinates):
            raise ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        print(self.coordinates['latitude'])
        if not (-90 < self.coordinates['latitude'] < 90):
            raise ValidationError("out if range for 'latitude'")
        if not (-180 < self.coordinates['longitude'] < 180):
            raise ValidationError("out if range for 'longitude'")

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=100)
    facility = models.ForeignKey("Facility", on_delete=models.CASCADE)
    owner = models.ForeignKey("Owner", on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=100)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
    cost = models.IntegerField()
    stock = models.ManyToManyField("Stock", blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Stock(models.Model):
    quantity = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)
    date_expiration = models.DateField(blank=True, null=True)


class Consumer(models.Model):
    lastname = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    middlename = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    passport = models.CharField(max_length=100)
    address = models.CharField(max_length=100)


class Transaction(models.Model):
    consumer = models.ForeignKey(Consumer, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    payment = models.IntegerField()


class Loyality(models.Model):
    name = models.CharField(max_length=100)
    tariff = models.CharField(max_length=100, choices=[('basic', 'Basic'), ('premium', 'Premium')])
    service = models.ManyToManyField(Service)

# Create your models here.
