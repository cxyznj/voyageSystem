import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import api from "../../api";
import { UserFlight } from "../../api/models/UserFlight";

const Comment = () => {
    const userFlightAPI = api.userFlight()
    const { id, fID } = useParams<string>()
    const navigate = useNavigate()
    const [data, setData] = useState<UserFlight>({
        rating: 5,
        review: "",
        flightRouteID: 0
    });

    const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setData({ ...data, review: e.target.value })
    }

    const handleRateClick = (value: number) => {
        setData({ ...data, rating: value / 100 * 5 })
    }

    const handleSubmit = async () => {
        if (id === "new") {
            await userFlightAPI.create(data)
        } else {
            await userFlightAPI.update(id!, data)
        }

        navigate("/allFlights")
    }

    const handleDelete = async () => {
        await userFlightAPI.delete(id!)
        navigate("/allFlights")
    }

    useEffect(() => {
        (async () => {
            if (id !== "new") {
                let res = await userFlightAPI.findByID(id!)
                setData(res)
            } else {
                setData({ ...data, flightRouteID: Number(fID) })
            }
        })()
    }, [id, fID, userFlightAPI])

    return (
        <div className="Container mt-5">
            <div className="row justify-content-center mb-5">
                <h2>Route Number: {data.flightRouteID}</h2>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h3>Comment</h3>
                    <textarea className="form-control" value={data.review} onChange={handleReviewChange}></textarea>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <h3>Rate</h3>
                    <Rating ratingValue={data.rating / 5 * 100} onClick={handleRateClick} />
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <Button variant="success" onClick={handleSubmit}>{id === "new" ? "Post" : "Update"}</Button> {" "}
                    {id !== "new" ? <Button variant="danger" onClick={handleDelete}>Delete</Button> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Comment