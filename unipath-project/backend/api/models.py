from django.db import models

# This class is like our "Excel Sheet"
class University(models.Model):
    # Column 1: The Name (Text)
    # max_length=100 means the name can't be longer than 100 letters.
    name = models.CharField(max_length=100)

    # Column 2: The Cutoff Score (Decimal Number)
    # max_digits=4 means total numbers (e.g., 1.455)
    # decimal_places=3 means numbers after the dot (e.g., .455)
    cutoff_score = models.DecimalField(max_digits=4, decimal_places=3)
    
    logo = models.ImageField(upload_to='uni_logos/', null=True, blank=True)

    # This makes the name show up nicely in the admin panel later
    def __str__(self):
        return self.name