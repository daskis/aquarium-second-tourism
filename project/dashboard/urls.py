from django.urls import path
from django.contrib.auth.views import LogoutView
from . import views

app_name='dashboard'
urlpatterns = [
    path('', views.base, name='base'),
    path('login/', views.LoginUser.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('facility-list/', views.FacilityList.as_view(), name='facility-list'),
    path('service-list/<int:pk>/', views.ServiceList.as_view(), name='service-list'),

    ]
