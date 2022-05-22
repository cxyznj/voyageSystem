from django.db import models


class Airline(models.Model):
    airlineID = models.CharField(max_length=255, primary_key=True)
    airlineName = models.CharField(max_length=255)
    country = models.CharField(max_length=255)


class Airport(models.Model):
    airportID = models.AutoField(primary_key=True)
    airportName = models.CharField(max_length=255)
    airportCity = models.CharField(max_length=255)
    airportCountry = models.CharField(max_length=255)
    IATA = models.CharField(max_length=255)


class FlightRoute(models.Model):
    flightRouteID = models.AutoField(primary_key=True)
    # airline = models.CharField(max_length=255)
    # airlineID = models.CharField(max_length=255)
    airline = models.ForeignKey("Airline", on_delete=models.CASCADE)
    sourceAirport = models.CharField(max_length=255)
    # sourceID = models.CharField(max_length=255)
    # one to many
    sourceID = models.ForeignKey("Airport", on_delete=models.CASCADE, related_name="sourceID_id")
    destinationAirport = models.CharField(max_length=255)
    # destinationID = models.CharField(max_length=255)
    # one to many
    destinationID = models.ForeignKey("Airport", on_delete=models.CASCADE, related_name="destinationID_id")
    stops = models.IntegerField()
    equipment = models.CharField(max_length=255, blank=True, default='')


class UserFlight(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey("user.User", on_delete=models.CASCADE)
    flightRouteID = models.ForeignKey("FlightRoute", on_delete=models.CASCADE)
    rating = models.IntegerField()
    review = models.CharField(max_length=255, blank=True, default='')