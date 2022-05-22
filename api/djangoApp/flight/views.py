import rest_framework
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from flight.rawsqlmodel import HistoryAirlineRoute, FlightTopRoute

from flight.models import Airport, Airline, FlightRoute, UserFlight
HistoryAirlineRoute, FlightTopRoute
from flight.serializers import AirportSerializer, AirlineSerializer, FlightRouteSerializer, UserFlightSerializer, HistoryAirlineRouteSerializer, FlightTopRouteSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins
from rest_framework import generics
from django_filters import rest_framework as filters
sql1 = "SELECT airlineName FROM flight_flightroute fr NATURAL JOIN flight_airline al WHERE flightRouteID in (SELECT flightRouteID_id FROM flight_userflight WHERE userID_id = 9)"


class AirportViewSet(ModelViewSet):
    """
    API endpoint that allows airport to be viewed or edited.
    """
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

    def list(self, request):

        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)


class AirlineViewSet(ModelViewSet):
    """
    API endpoint that allows airline to be viewed or edited.
    """

    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)


class FlightRouteViewSet(ModelViewSet):
    """
    API endpoint that allows flightRoute to be viewed or edited.
    """

    queryset = FlightRoute.objects.all()
    serializer_class = FlightRouteSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['airline', 'sourceAirport', 'destinationAirport']
    # def list(self, request):
    #     serializer = self.serializer_class(FlightRoute.objects.filter(airline_id="2B"), many=True)
    #     return Response(serializer.data)

class UserFlightView(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = UserFlight.objects.all()
    serializer_class = UserFlightSerializer
    permission_classes = (AllowAny,)


    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class UserFlightViewSet(ModelViewSet):
    """
    API endpoint that allows userFlight to be viewed or edited.
    """

    queryset = UserFlight.objects.all()
    serializer_class = UserFlightSerializer
    permission_classes = (AllowAny,)

    def get_user_rate(self, request):
        user = request.user
        userid = user.id
        route_id = self.request.query_params.get('route_id')
        id = self.request.query_params.get('id')
        print(user.id, route_id, id)
        if id is not None:
            result = UserFlight.objects.get(id=id)
            #page = self.paginate_queryset(result)
            serializer = self.serializer_class(result)
        else:
            result = UserFlight.objects.filter(userID=userid)
            if route_id is not None:
                result = result.filter(flightRouteID=route_id)
            #page = self.paginate_queryset(result)
            serializer = self.serializer_class(result, many=True)
        if not result:
            return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
        else:
            #return self.get_paginated_response(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        rate = request.data.get('rate', {})
        user = request.user
        userid = user.id
        rate["userID"] = userid
        serializer = self.serializer_class(data=rate)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request):
        rate = request.data.get('rate', {})
        updateid = rate.get('id', None)
        #flight_route_id = rate.get('flightRouteID', None)
        user = request.user
        userid = user.id
        rate["userID"] = userid
        #prev_userflight = UserFlight.objects.get(userID=userid, flightRouteID=flight_route_id)
        prev_userflight = UserFlight.objects.get(id=updateid)
        serializer = self.serializer_class(prev_userflight, data=rate)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    # def delete_rate(self, request):
    #     rate = request.data.get('rate', {})
    #     updateid = rate.get('id', None)
    #     prev_userflight = UserFlight.objects.get(id=updateid)
    #     prev_userflight.delete()

    #     return Response(status=status.HTTP_200_OK)




class FlightTopRouteViewSet(ModelViewSet):
    """
    API endpoint that allows flightRoute to be viewed or edited.
    """

    def list(self, request):
        sql = "(SELECT flightRouteID_id as flightRouteID, fr.airline_id as airline, fr.sourceAirport as sourceAirport, fr.sourceID_id as sourceID, fr.destinationAirport as destinationAirport, fr.destinationID_id as destinationID, fr.stops as stops, fr.equipment as equipment, ROUND(avg(rating), 2) as AVGRating, COUNT(review) as reviewNum \
                FROM flight_userflight JOIN flight_flightroute fr \
                WHERE flight_userflight.flightRouteID_id = fr.flightRouteID \
                GROUP BY flightRouteID_id \
                ORDER BY AVGRating DESC \
                LIMIT 10 \
                ) \
                UNION \
                (SELECT flightRouteID_id as flightRouteID, fr.airline_id as airline, fr.sourceAirport as sourceAirport, fr.sourceID_id as sourceID, fr.destinationAirport as destinationAirport, fr.destinationID_id as destinationID, fr.stops as stops, fr.equipment as equipment, ROUND(avg(rating), 2) as AVGRating, COUNT(review) as reviewNum \
                FROM flight_userflight JOIN flight_flightroute fr \
                WHERE flight_userflight.flightRouteID_id = fr.flightRouteID and review != '' \
                GROUP BY flightRouteID_id \
                ORDER BY reviewNum DESC \
                LIMIT 10 \
                );"

        result = FlightTopRoute.objects.raw(sql)
        page = self.paginate_queryset(result)
        if page is not None:
            serializer = FlightTopRouteSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = FlightTopRouteSerializer(result, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HistoryViewSet(ModelViewSet):
    """
    API endpoint that allows flightRoute to be viewed or edited.
    """

    def list(self, request):
        user = request.user
        userid = int(user.id)
        sql = "SELECT ar.airlineName as airlineName, fr.flightRouteID as flightRouteID, fr.sourceAirport as sourceAirport, fr.destinationAirport as destinationAirport, fr.stops as stops, fr.equipment as equipment \
            FROM voyages.flight_flightroute fr NATURAL JOIN voyages.flight_airline ar \
            WHERE fr.airline_id = ar.airlineID and fr.flightRouteID in ( \
            SELECT flightRouteID_id \
            FROM voyages.flight_userflight \
            WHERE userID_id = %d);" % userid
        result = HistoryAirlineRoute.objects.raw(sql)
        page = self.paginate_queryset(result)
        if page is not None:
            serializer = HistoryAirlineRouteSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = HistoryAirlineRouteSerializer(result, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)