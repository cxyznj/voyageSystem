import { useEffect, useState } from "react";
import api from "../../api";
import { Flightroute } from "../../api/models/Flightroute";
import ListPaginationView from "../ListPaginationView";
import "./index.css";

export default function MyFlight() {

    const MYFLIGHT_FIELDS = ["flightRouteID", "airlineName", "sourceAirport", "destinationAirport", "stops", "equipment"]
    const flightrouteAPI = api.flightroute()
    const [routes, setRoutes] = useState<Flightroute[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currPage, setCurrPage] = useState<number>(1)

    const gotopage = async (page: number) => {
        let [routes, totalPages] = await flightrouteAPI.listHistory(page)
        setRoutes(routes)
        setCurrPage(page)
        setTotalPages(totalPages)
    }

    useEffect(() => {
        gotopage(1)
    }, [flightrouteAPI]);


    return (
        <div className="container mt-5">
            <div className="row">
                <h2 className="mb-5">My Flights</h2>
            </div>
            <ListPaginationView fields={MYFLIGHT_FIELDS} routes={routes} currPage={currPage} totalPages={totalPages} gotopage={gotopage} />
        </div>


    );
}