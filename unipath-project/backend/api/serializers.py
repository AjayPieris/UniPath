from rest_framework import serializers
from .models import University

# This class translates the University model into JSON
class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        # We want to show these 3 fields to the user
        fields = ['id', 'name', 'cutoff_score', 'logo']