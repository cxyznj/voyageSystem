# demo

## Advanced SQL queries
1.
Description: Current user get the detail of routes that the user used to take.
```sql
SELECT ar.airlineName, fr.flightRouteID, fr.sourceAirport, fr.destinationAirport, fr.stops, fr.equipment
FROM voyages.flight_flightroute fr NATURAL JOIN voyages.flight_airline ar
WHERE fr.airline_id = ar.airlineID and fr.flightRouteID in (
  SELECT flightRouteID_id
  FROM voyages.flight_userflight
  WHERE userID_id = "CURRENT_USER_ID"
);
```

2.
Description: Get the TOP airline route detail with top rating and top reviews number.
```sql
(SELECT flightRouteID_id as flightRouteID, fr.airline_id as airline, fr.sourceAirport as sourceAirport, fr.sourceID_id as sourceID, fr.destinationAirport as destinationAirport, fr.destinationID_id as destinationID, fr.stops as stops, fr.equipment as equipment, ROUND(avg(rating), 2) as route_rating, COUNT(review) as review_num
FROM flight_userflight JOIN flight_flightroute fr
WHERE flight_userflight.flightRouteID_id = fr.flightRouteID
GROUP BY flightRouteID_id
ORDER BY route_rating DESC
LIMIT 10
)
UNION
(SELECT flightRouteID_id as flightRouteID, fr.airline_id as airline, fr.sourceAirport as sourceAirport, fr.sourceID_id as sourceID, fr.destinationAirport as destinationAirport, fr.destinationID_id as destinationID, fr.stops as stops, fr.equipment as equipment, ROUND(avg(rating), 2) as route_rating, COUNT(review) as review_num
FROM flight_userflight JOIN flight_flightroute fr
WHERE flight_userflight.flightRouteID_id = fr.flightRouteID and review != ''
GROUP BY flightRouteID_id
ORDER BY review_num DESC
LIMIT 10
);
```
