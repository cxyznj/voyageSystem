from django.urls import path, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import AirportViewSet, AirlineViewSet, FlightRouteViewSet, UserFlightView, UserFlightViewSet, FlightTopRouteViewSet, \
    HistoryViewSet
from . import views
app_name = 'flight'


article_list = views.FlightRouteViewSet.as_view(
    {
        'get': 'list',
        'post': 'create'
    })

article_detail = views.FlightRouteViewSet.as_view({
    'get': 'retrieve', # 只处理get请求，获取单个记录
})

urlpatterns = [
    path('airport/', AirportViewSet.as_view({'get': 'list'})),
    path('airline/', AirlineViewSet.as_view({'get': 'list'})),
    path('routes/', FlightRouteViewSet.as_view({'get': 'list'})),
    re_path(r'^rate/(?P<route_id>.+)/(?P<id>.+)/$', UserFlightViewSet.as_view({'get': 'get_user_rate'})),
    re_path(r'^routes/(?P<pk>\d+)/$', FlightRouteViewSet.as_view({'get': 'retrieve'})),
    path('rate/<int:pk>', UserFlightView.as_view()),
    path('rate/', UserFlightViewSet.as_view({'get': 'get_user_rate', 'post': 'create', 'put': 'update'})),
    path('toproute/', FlightTopRouteViewSet.as_view({'get': 'list'})),
    path('history/', HistoryViewSet.as_view({'get': 'list'}))
]

urlpatterns = format_suffix_patterns(urlpatterns)