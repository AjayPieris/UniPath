from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import University
from .serializers import UniversitySerializer

# @api_view(['POST']) means this view only accepts data SENT to it (like submitting a form)
@api_view(['POST']) 
def check_eligibility(request):
    # 1. Get the student's Z-Score from the "order" (request)
    # We expect the user to send something like: { "z_score": 1.7 }
    student_score = request.data.get('z_score')

    # 2. Safety Check: If they didn't send a number, send an error.
    if student_score is None:
        return Response({"message": "Please send a z_score!"}, status=400)

    # 3. THE LOGIC (The Cooking)
    # We want universities where the Cutoff is LESS THAN or EQUAL TO (lte) the student's score.
    # Logic: If I have 1.8, I can go to a uni requiring 1.6 (1.6 <= 1.8).
    available_unis = University.objects.filter(cutoff_score__lte=student_score)

    # 4. Hand the cooked food to the Waiter (Serializer)
    # many=True means "we are expecting a list of items, not just one"
    serializer = UniversitySerializer(available_unis, many=True)

    # 5. Serve the food to the customer
    return Response(serializer.data)