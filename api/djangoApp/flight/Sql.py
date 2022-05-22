from django.db import connection
import pymysql

sql1 = "SELECT airlineName FROM flight_flightroute fr NATURAL JOIN flight_airline al WHERE flightRouteID in (SELECT flightRouteID_id FROM flight_userflight WHERE userID_id = 9)"


conn = pymysql.connect(
    host="34.135.227.122",
    port=3306,
    user='root',
    password='password',
)
cursor = connection.cursor()
cursor.execute(sql1)
print(cursor.fetchall())
