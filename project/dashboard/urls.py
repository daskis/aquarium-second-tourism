from django.urls import path, include
from django.contrib.auth.views import LogoutView
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'facilities', views.FacilityViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'consumers', views.ConsumerViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'loyalitys', views.LoyalityViewSet)
router.register(r'stocks', views.StockViewSet)
router.register(r'owners', views.OwnerViewSet)
router.register(r'travels', views.TravelViewSet)
router.register(r'general', views.GeneralViewSet)
router.register(r'reviews', views.ReviewViewSet)
router.register(r'beach', views.BeachViewSet)
router.register(r'valley', views.ValleyViewSet)
router.register(r'hostel', views.HostelViewSet)

app_name='dashboard'
urlpatterns = [
    # path('', views.base, name='base'),
    # path('login/', views.LoginUser.as_view(), name='login'),
    # path('logout/', LogoutView.as_view(), name='logout'),
    # path('register/', views.RegisterUser.as_view(), name='register'),
    # path('facility-list/', views.FacilityList.as_view(), name='facility-list'),
    # path('service-list/<int:pk>/', views.ServiceList.as_view(), name='service-list'),
    path('api/', include(router.urls)),
    path('api/images-list', views.ImagesListView.as_view(), name='images-list'),



    ]
