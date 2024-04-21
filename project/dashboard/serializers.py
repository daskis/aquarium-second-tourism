from .models import *
from rest_framework import serializers
from .validateutils import coors_validate


class GeneralSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    def get_img(self, obj):
        return [image.image.url for image in obj.img.all()]

    class Meta:
        model = General
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'
    def validate(self, attrs):
        coors_validate(attrs['coordinates'])
        return super().validate(attrs)

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ConsumerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumer
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class LoyalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Loyality
        fields = '__all__'


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'


class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = '__all__'


class BeachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beach
        fields = '__all__'
    def validate(self, attrs):
        coors_validate(attrs['coordinates'])
        return super().validate(attrs)


class ValleySerializer(serializers.ModelSerializer):

    class Meta:
        model = Valley
        fields = '__all__'
    def validate(self, attrs):
        coors_validate(attrs['coordinates'])
        return super().validate(attrs)



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'
    def validate(self, attrs):
        coors_validate(attrs['coordinates'])
        return super().validate(attrs)

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['image']


#ЩАС БУДУ ДЕЛАТЬ

class QuestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quests
        fields = '__all__'
