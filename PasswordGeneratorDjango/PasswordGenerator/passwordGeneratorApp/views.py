from django.shortcuts import render
import random
from django.http import JsonResponse
from .models import GeneratedPassword
import string

# Create your views here.
def home(request):
    password = ""
    length = int(request.GET.get("length", 10))
    use_uppercase = request.GET.get("uppercase") == "on"
    use_numbers = request.GET.get("numbers") == "on"
    use_special = request.GET.get("special") == "on"

    characters = string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_numbers:
        characters += string.digits
    if use_special:
        characters += string.punctuation

    password = ''.join(random.choice(characters) for _ in range(length))

    # Save the password in the database
    GeneratedPassword.objects.create(password=password)

    # Retrieve the last 5 passwords from the database
    recent_passwords = GeneratedPassword.objects.order_by("-created_at")[:5]

    return render(request, "home.html", {"password": password, "recent_passwords": recent_passwords})
