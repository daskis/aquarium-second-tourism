from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractUser


class Owner(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)

class Consumer(models.Model):
    user = models.OneToOneField("users.User", on_delete=models.CASCADE)

    passport = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    coins = models.IntegerField(default=0)
    experience = models.IntegerField(default=0)
    level = models.IntegerField(default=1)

class Images(models.Model):
    image = models.ImageField(upload_to='img/')


class General(models.Model):
    "базовая модель для антона"
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField()
    date = models.DateField()
    img = models.ManyToManyField(Images, blank=True, null=True)
    rating = models.FloatField()

    class Meta:
        ordering = ['-rating']

    def __str__(self):
        return self.name


class Facility(General):
    "Интересные места для антона"
    coordinates = models.JSONField(default=dict)

    def clean_coordinates(self):
        if self.coordinates and (
                'latitude' not in self.coordinates or 'longitude' not in self.coordinates):
            raise ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        print(self.coordinates['latitude'])
        if not (-90 < self.coordinates['latitude'] < 90):
            raise ValidationError("out if range for 'latitude'")
        if not (-180 < self.coordinates['longitude'] < 180):
            raise ValidationError("out if range for 'longitude'")


class Travel(General):
    "тур для антона"
    rate = models.IntegerField()
    facilitys = models.ManyToManyField("Facility", blank=True)


class Hostel(General):
    "отели места"
    reviews = models.ManyToManyField("Review", blank=True, null=True)
    coordinates = models.JSONField(default=dict)

    def clean_coordinates(self):
        if self.coordinates and (
                'latitude' not in self.coordinates or 'longitude' not in self.coordinates):
            raise ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        print(self.coordinates['latitude'])
        if not (-90 < self.coordinates['latitude'] < 90):
            raise ValidationError("out if range for 'latitude'")
        if not (-180 < self.coordinates['longitude'] < 180):
            raise ValidationError("out if range for 'longitude'")


class Valley(General):
    "парки"

    reviews = models.ManyToManyField("Review", blank=True, null=True)
    coordinates = models.JSONField(default=dict)

    def clean(self):
        super().clean()
        if self.coordinates and (
                'latitude' not in self.coordinates or 'longitude' not in self.coordinates):
            raise ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        print(self.coordinates['latitude'])
        if not (-90 < self.coordinates['latitude'] < 90):
            raise ValidationError("out if range for 'latitude'")
        if not (-180 < self.coordinates['longitude'] < 180):
            raise ValidationError("out if range for 'longitude'")



class Beach(General):
    "пляжи"
    reviews = models.ManyToManyField("Review", blank=True, null=True)
    coordinates = models.JSONField(default=dict)

    def clean_coordinates(self):
        if self.coordinates and (
                'latitude' not in self.coordinates or 'longitude' not in self.coordinates):
            raise ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        print(self.coordinates['latitude'])
        if not (-90 < self.coordinates['latitude'] < 90):
            raise ValidationError("out if range for 'latitude'")
        if not (-180 < self.coordinates['longitude'] < 180):
            raise ValidationError("out if range for 'longitude'")

    # def save(self, *args, **kwargs):
    #         self.full_clean()
    #         super().save(*args, **kwargs)


class Event(General):
    pass
    # facility = models.ForeignKey("Facility", on_delete=models.CASCADE)
    #


class Service(models.Model):
    name = models.CharField(max_length=100)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
    cost = models.IntegerField()

    class Meta:
        ordering = ['name']


class Transaction(models.Model):
    consumer = models.ForeignKey("Consumer", on_delete=models.CASCADE)
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


class Review(models.Model):
    consumer = models.ForeignKey("Consumer", on_delete=models.CASCADE)
    text = models.TextField()
    rate = models.FloatField()
    metrics = models.JSONField(default=dict)
    date = models.DateField(auto_now_add=True)




# ЩАС БУДУ ДЕЛАТЬ НОВЫЕ МОДЕЛИ
class Quests(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='img/')
    date_added = models.DateField(auto_now_add=True)
    date_expiration = models.DateField(blank=True, null=True)
    reward = models.IntegerField()


class Stock(models.Model):
    """ Класс для хранения акций/бонусов """
    services = models.ManyToManyField(Service, blank=True, null=True)
    quantity = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)
    date_expiration = models.DateField(blank=True, null=True)

    def clean_expiration(self):
        if self.date_expiration < self.date_added:
            raise ValidationError("Expiration date cannot be earlier than the purchase date")

    def clean_quantity(self):
        if self.quantity < 0:
            raise ValidationError("Quantity cannot be negative")
