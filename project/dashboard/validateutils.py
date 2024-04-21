from rest_framework import serializers

#{"latitude":0,"longitude":0}
def coors_validate(coordinates):

    if coordinates:
        if 'latitude' not in coordinates or 'longitude' not in coordinates:
            raise serializers.ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        if not (-90 < coordinates['latitude'] < 90):
            raise serializers.ValidationError("out of range for 'latitude'")
        if not (-180 < coordinates['longitude'] < 180):
            raise serializers.ValidationError("out of range for 'longitude'")
    else:
        return serializers.ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")