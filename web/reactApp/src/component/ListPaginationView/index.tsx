import { Pagination } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Flightroute } from "../../api/models/Flightroute"

interface Props {
    fields: string[]
    routes: Flightroute[]
    currPage: number
    totalPages: number
    gotopage: (page: number) => Promise<void>
}

const ListPaginationView = ({ fields, routes, currPage, totalPages, gotopage }: Props) => {

    const navigate = useNavigate()

    const handlePrev = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (currPage === 1) {
            return
        }

        gotopage(currPage - 1)
    }


    const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (currPage === totalPages) {
            return
        }

        gotopage(currPage + 1)
    }

    const gen_tds = (route: any) => {
        const res = []
        for (const field of fields) {
            res.push((<td key={field}>{route[field]}</td>))
        }

        return res
    }

    return (
        <>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-10">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {fields.map((field, idx) => <th scope="col" key={idx}>{field}</th>)}
                                {/* <th scope="col">Id</th>
                                <th scope="col">Airline</th>
                                <th scope="col">sourceAirport</th>
                                <th scope="col">destinationAirport</th>
                                <th scope="col">stops</th>
                                <th scope="col">equipment</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {routes.map((route, idx) => {
                                return (
                                    <tr key={idx} style={{ cursor: "pointer" }} onClick={(e) => navigate(`/routeDetail/${route.flightRouteID}`)}>
                                        {gen_tds(route)}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages !== 0 ? <div className="row d-flex justify-content-center mt-2">
                <div className="col-md-10">
                    <Pagination>
                        <Pagination.Prev onClick={handlePrev} />
                        {currPage !== 1 ? <Pagination.Item onClick={() => gotopage(1)}>1</Pagination.Item> : <></>}
                        {(currPage !== 1 && currPage !== 2) ? <Pagination.Ellipsis /> : <></>}

                        <Pagination.Item active>{currPage}</Pagination.Item>

                        {(currPage !== totalPages && currPage !== totalPages - 1) ? <Pagination.Ellipsis /> : <></>}
                        {currPage !== totalPages ? <Pagination.Item onClick={() => gotopage(totalPages)}>{totalPages}</Pagination.Item> : <></>}
                        <Pagination.Next onClick={handleNext} />
                    </Pagination>
                </div>
            </div> : <></>}

        </>
    )
}

export default ListPaginationView