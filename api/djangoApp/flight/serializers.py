from rest_framework import serializers

from flight.models import Airport, Airline, FlightRoute, UserFlight
from flight.rawsqlmodel import HistoryAirlineRoute, FlightTopRoute


class AirportSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = Airport
        fields = ['airportID', 'airportName', 'airportCity', 'airportCountry', 'IATA', 'token']


class AirlineSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = Airline
        fields = ['airlineID', 'airlineName', 'country', 'token']


class FlightRouteSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = FlightRoute
        fields = ['flightRouteID', 'airline', 'sourceAirport', 'sourceID', 'destinationAirport','destinationID', 'stops',
                  'equipment', 'token']


class UserFlightSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = UserFlight
        fields = ['id', 'userID', 'flightRouteID', 'rating', 'review', 'token']


class HistoryAirlineRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryAirlineRoute
        fields = ['airlineName', 'flightRouteID', 'sourceAirport', 'destinationAirport', 'stops', 'equipment']


class FlightTopRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightTopRoute
        fields = ['flightRouteID', 'airline', 'sourceAirport', 'sourceID', 'destinationAirport','destinationID', 'stops',
                  'equipment', 'AVGRating', 'reviewNum']