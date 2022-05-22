```sql
use voyages;

drop PROCEDURE AutoFillComment;

DELIMITER //
CREATE PROCEDURE AutoFillComment(
	IN inFlightRouteID int,
	IN in_cur_rating int,
    	IN inUserID int,
	OUT auto_comment varchar(255)
)
BEGIN

DECLARE loop_exit BOOLEAN DEFAULT FALSE;
DECLARE varFlightRouteID INT;
DECLARE lower_rating_num INT;
DECLARE higher_rating_num INT;
DECLARE avgRating REAL;
DECLARE avgRating_user REAL;
-- Get all routes ID belong to the airline that the user current review
DECLARE custInfo CURSOR FOR (
	SELECT flightRouteID
	FROM (
		SELECT r.airline_id
		FROM flight_airline a, flight_flightroute r
		WHERE a.airlineID = r.airline_id AND r.flightRouteID = inFlightRouteID
	) TargetAirline NATURAL JOIN flight_flightroute
);
 	
DECLARE CONTINUE HANDLER FOR NOT FOUND SET loop_exit = TRUE;
SET lower_rating_num = 0;
SET higher_rating_num = 0;

OPEN custInfo;
cloop: LOOP
	FETCH custInfo INTO varFlightRouteID;
	IF loop_exit THEN
		LEAVE cloop;
	END IF;

	-- Find the average rating of the the route selected by cursor. Plus has the same take off country same with the user current review to find the best route belongs to the airline with the same take off country.
	SET avgRating = (
		SELECT ROUND(avg(rating), 2) as route_rating
		FROM flight_userflight u JOIN flight_airport a JOIN flight_flightroute f
		WHERE 	a.IATA = f.sourceAirport 
			AND u.flightRouteID_id = varFlightRouteID
			AND f.flightRouteID = varFlightRouteID
			AND a.airportCountry IN (SELECT a2.airportCountry
						FROM flight_airport a2 JOIN flight_flightroute f2
						WHERE a2.IATA = f2.sourceAirport AND f2.flightRouteID_id = inFlightRouteID)
		GROUP BY flightRouteID_id
	);
	IF avgRating IS NOT NULL THEN
		IF avgRating > in_cur_rating THEN
			SET lower_rating_num = lower_rating_num + 1;
		ELSE
			SET higher_rating_num = higher_rating_num + 1;
		END IF;
	END IF;
END LOOP cloop;
CLOSE custInfo;

IF higher_rating_num > lower_rating_num THEN
	SET auto_comment = "Above average in this airline start with this country";
ELSEIF higher_rating_num < lower_rating_num THEN
	SET auto_comment = "Below average in this airline start with this country";
ELSE
	SET auto_comment = "Average in this airline start with this country";
END IF;

-- The current rating compare with all rating reviewed by current user with the same airline.
SET avgRating_user = (
			SELECT AVG(u.rating)
		  	FROM flight_userflight u JOIN flight_flightroute f
		  	WHERE u.flightRouteID_id = f.flightRouteID AND u.userID_id = inUserID
		  	GROUP BY f.airline_id
			HAVING f.airline_id = (SELECT DISTINCT(airline_id) FROM flight_flightroute WHERE r.flightRouteID = inFlightRouteID)
		  );
                      
IF avgRating_user > in_cur_rating THEN
	SET auto_comment = (SELECT concat(auto_comment, ". One of my least favorite routes for this airline."));
ELSEIF avgRating_user < in_cur_rating THEN
	SET auto_comment = (SELECT concat(auto_comment, ". One of my favorite routes for this airline. For sure!"));
ELSE
	SET auto_comment = (SELECT concat(auto_comment, ". So so!"));
END IF;

END //
DELIMITER ;

drop trigger AutoCommentTrigger;
-- trigger

DELIMITER //
CREATE TRIGGER AutoCommentTrigger
BEFORE INSERT On voyages.flight_userflight
FOR EACH ROW
BEGIN

SET @review = NEW.review;
	IF @review = "" THEN
	call AutoFillComment(NEW.flightRouteID_id, NEW.rating, NEW.userID_id, @auto_comment);
	SET NEW.review = @auto_comment; 
END IF;

END //
DELIMITER ;



TRUNCATE `voyages`.`flight_userflight`;

