from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractUser


class Owner(AbstractUser):
    name = models.CharField(max_length=100)
    experience = models.IntegerField(default=0)
    phone = models.CharField(max_length=100)
    level = models.IntegerField(default=1)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)



class Facility(models.Model):
    "точка для антона"
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    coordinates = models.JSONField(default=dict)
    rate = models.IntegerField()
    img = models.ImageField(upload_to='img/', blank=True, null=True)

    def clean_coordinates(self):
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


class Travel(models.Model):
    "тур для антона"
    name = models.CharField(max_length=100)
    rate = models.IntegerField()
    date = models.DateField()
    img = models.ImageField(upload_to='img/', blank=True, null=True)
    facilitys = models.ManyToManyField("Facility", blank=True)

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

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Stock(models.Model):
    services = models.ManyToManyField(Service)
    quantity = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)
    date_expiration = models.DateField(blank=True, null=True)
    def clean_expiration(self):
        if self.date_expiration < self.date_added:
            raise ValidationError("Expiration date cannot be earlier than the purchase date")

    def clean_quantity(self):
        if self.quantity < 0:
            raise ValidationError("Quantity cannot be negative")

class Consumer(models.Model):
    lastname = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    middlename = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, unique=True)
    passport = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    coins = models.IntegerField(default=0)


class Transaction(models.Model):
    consumer = models.ForeignKey(Consumer, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    payment = models.IntegerField()
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']


class Loyality(models.Model):
    consumer = models.OneToOneField("Consumer", on_delete=models.CASCADE)
    vipstatus = models.CharField(choices=[('standart', 'standart'), ('gold', 'gold'), ('platinum', 'platinum')],
                                 max_length=100)
    services = models.ManyToManyField(Service)

# Create your models here.
