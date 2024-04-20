from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import *


class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label="Логин",
                               widget=forms.TextInput(attrs={'class': 'form-input'}))
    password = forms.CharField(label="Пароль",
                               widget=forms.PasswordInput(attrs={'class': 'form-input'}))

    class Meta:
        model = get_user_model()
        fields = ['username', 'password']


class RegisterUserForm(UserCreationForm):
    username = forms.CharField(label="Логин", widget=forms.TextInput(attrs={'class': 'form-input'}))
    password1 = forms.CharField(label="Пароль", widget=forms.PasswordInput(attrs={'class': 'form-input'}))
    password2 = forms.CharField(label="Повтор пароля", widget=forms.PasswordInput(attrs={'class': 'form-input'}))

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']
        labels = {
            'email': 'E-mail',
            'first_name': "Имя",
            'last_name': "Фамилия",
        }
        widgets = {
            'email': forms.TextInput(attrs={'class': 'form-input'}),
            'first_name': forms.TextInput(attrs={'class': 'form-input'}),
            'last_name': forms.TextInput(attrs={'class': 'form-input'}),
        }

    def clean_email(self):
        email = self.cleaned_data['email']
        if get_user_model().objects.filter(email=email).exists():
            raise forms.ValidationError("Такой E-mail уже существует!")
        return email


class LoyalityForm(forms.ModelForm):
    class Meta:
        model = Loyality
        fields = ['name', 'tariff', 'service']
        labels = {
            'name': "Название",
            'tariff': "Тариф",
            'service': "Услуга",
        }
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input'}),
            'tariff': forms.TextInput(attrs={'class': 'form-input'}),
        }


class FacilityForm(forms.ModelForm):
    class Meta:
        model = Facility
        fields = ['name', 'owner']
        labels = {
            'name': "Название",
            'owner': "Владелец",
        }
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input'}),
        }


class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['name', 'facility']
        labels = {
            'name': "Услуга",
            'facility': "Точка",
        }
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input'}),
        }


class ConsumerForm(forms.ModelForm):
    class Meta:
        model = Consumer
        fields = ['name']
        labels = {
            'name': "Имя",
        }
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input'}),

        }
