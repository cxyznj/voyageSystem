from django.db import models

class HistoryAirlineRoute(models.Model):
    airlineName = models.CharField(max_length=255)
    flightRouteID = models.IntegerField(primary_key=True)
    sourceAirport = models.CharField(max_length=255)
    destinationAirport = models.CharField(max_length=255)
    stops = models.IntegerField()
    equipment = models.CharField(max_length=255, blank=True, default='')


class FlightTopRoute(models.Model):
    flightRouteID = models.IntegerField(primary_key=True)
    airline = models.CharField(max_length=255)
    sourceAirport = models.CharField(max_length=255)
    sourceID = models.CharField(max_length=255)
    destinationAirport = models.CharField(max_length=255)
    destinationID = models.CharField(max_length=255)
    stops = models.IntegerField()
    equipment = models.CharField(max_length=255, blank=True, default='')
    AVGRating = models.FloatField()
    reviewNum = models.IntegerField()