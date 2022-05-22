from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from flight import  views

# router = routers.DefaultRouter()
# router.register(r'flight', views.AirportViewSet)
# router.register(r'flight', views.AirlineViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls', namespace='user')),
    path('api/', include('flight.urls', namespace='flight')),
]
