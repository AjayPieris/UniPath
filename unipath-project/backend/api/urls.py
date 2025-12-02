from django.urls import path
from .views import check_eligibility

urlpatterns = [
    # When user visits '.../check/', run the 'check_eligibility' function
    path('check/', check_eligibility),
]