import { useEffect, useState } from "react";
import api from "../../api";
import { Flightroute } from "../../api/models/Flightroute";
import ListPaginationView from "../ListPaginationView";
import "./index.css";
export default function SearchBar() {

    const ORDER_FIELDS = ["flightRouteID", "airline", "sourceAirport", "destinationAirport", "stops", "equipment", "AVGRating", "reviewNum"]
    const NON_ORDER_FIELDS = ["flightRouteID", "airline", "sourceAirport", "destinationAirport", "stops", "equipment"]
    const flightrouteAPI = api.flightroute()
    const [routes, setRoutes] = useState<Flightroute[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currPage, setCurrPage] = useState<number>(1)
    const [airline, setAirline] = useState<string>("")
    const [ori, setOri] = useState<string>("")
    const [des, setDes] = useState<string>("")
    const [order, setOrder] = useState<boolean>(false)

    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        gotopage(1)
        setCurrPage(1)
    };

    const handleOrderChange = async () => {
        setOrder(!order)
    }

    const gotopage = async (page: number) => {
        if (order) {
            let [routes, totalPages] = await flightrouteAPI.listOrder(page)
            setRoutes(routes)
            setCurrPage(page)
            setTotalPages(totalPages)
        } else {
            let [routes, totalPages] = await flightrouteAPI.list(ori, des, airline, page)
            setRoutes(routes)
            setCurrPage(page)
            setTotalPages(totalPages)
        }
    }

    useEffect(() => {
        gotopage(1)
    }, [flightrouteAPI, order]);


    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                    <div className="card p-3 py-4">
                        <h2>Search Airline</h2>
                        <div className="col-md-12">
                            <div className="search">
                                <i className="fa fa-search"></i>
                                <input type="text" className="form-control" name="search_flight" placeholder="Airline" value={airline} onChange={(e) => setAirline(e.target.value)} />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="search">
                                    <input type="text" className="form-control" placeholder="Origin Airport" value={ori} onChange={(e) => setOri(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="search">
                                    <input type="text" className="form-control" placeholder="Destination Airport" value={des} onChange={(e) => setDes(e.target.value)} />
                                    <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <span>Show Top Routes</span> {" "}
                                <input type="checkbox" aria-label="Checkbox for following text input" checked={order} onChange={handleOrderChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ListPaginationView
                fields={order ? ORDER_FIELDS : NON_ORDER_FIELDS}
                routes={routes}
                currPage={currPage}
                totalPages={totalPages}
                gotopage={gotopage} />
        </div>


    );
}