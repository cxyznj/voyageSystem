import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { Flightroute } from "../../api/models/Flightroute";
import "./index.css";
import { Rating } from 'react-simple-star-rating';

const RouteDetail = () => {
    const flightrouteAPI = api.flightroute()
    const userFlightAPI = api.userFlight()
    const { flightRouteID } = useParams<string>();
    const [route, setRoute] = useState<Flightroute>({
        flightRouteID: 0,
        airline: "",
        sourceAirport: "",
        destinationAirport: "",
        stops: 0,
        equipment: "",
        sourceID: 0,
        destinationID: 0,
    });
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            let route = await flightrouteAPI.findByID(flightRouteID!)
            setRoute(route)
        })()
    }, [flightRouteID, flightrouteAPI])

    const handleCommentNav = async () => {
        const userFlight = await userFlightAPI.findByRouteId(route.flightRouteID)
        console.log(userFlight)
        if (userFlight === undefined) {
            navigate(`/comment/new/${route.flightRouteID}`)
            return
        }
        navigate(`/comment/${userFlight.id}/${route.flightRouteID}`)
    }

    return (
        <div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>flightRouteID</th>
                        <th>airline</th>
                        <th>sourceAirport</th>
                        <th>destinationAirport</th>
                        <th>stops</th>
                        <th>equipment</th>
                        <th>sourceID</th>
                        <th>destinationID</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{route.flightRouteID}</td>
                        <td>{route.airline}</td>
                        <td>{route.sourceAirport}</td>
                        <td>{route.destinationAirport}</td>
                        <td>{route.stops}</td>
                        <td>{route.equipment}</td>
                        <td>{route.sourceID}</td>
                        <td>{route.destinationID}</td>
                        <td>
                            {/* TODO: rating out of 100 not 5 */}
                            <Rating ratingValue={80} readonly={true} />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Button variant="success" onClick={handleCommentNav}>Rate</Button>{' '}
        </div>
    )
}

export default RouteDetail