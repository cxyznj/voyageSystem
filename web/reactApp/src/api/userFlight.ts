import { AxiosInstance } from "axios";
import { Flightroute } from "./models/Flightroute";
import { UserFlight } from "./models/UserFlight";

export default class UserFlightAPI {
    client: AxiosInstance;
    constructor(client: AxiosInstance) {
        this.client = client
    }

    async list(): Promise<[UserFlight[], number]> {
        // let url = `/api/routes?page=${page}`
        // if (ori !== "") {
        //     url += `&ori=${ori}`
        // }
        // if (des !== "") {
        //     url += `&des=${des}`
        // }

        // const rsp = await this.client.get(url)
        // if (rsp.status !== 200) {
        //     throw new Error("list questions failed, expect http 200")
        // }
        // return rsp.data

        return [[
            {
                id: 1,
                userID: 1,
                rating: 5,
                review: "good airline=",
                flightRouteID: 1
            },
            {
                id: 2,
                userID: 1,
                rating: 1,
                review: "bad airline=",
                flightRouteID: 2
            },
        ], 2]
    }

    async findByID(id: string): Promise<UserFlight> {
        const rsp = await this.client.get(`/api/rate/?id=${id}`)
        if (rsp.status !== 200) {
            throw new Error("expect http 200")
        }
        console.log(rsp.data)
        return rsp.data

        // return {
        //     id: 1,
        //     userID: 1,
        //     rating: 5,
        //     review: "good airline=",
        //     flightRouteID: 1
        // }
    }

    async findByRouteId(flightRouteID: number): Promise<UserFlight | undefined> {
        try {
            const rsp = await this.client.get(`/api/rate/?route_id=${flightRouteID}`)
            if (rsp.status !== 200) {
                return
            }
            return rsp.data[0]
        } catch (err) {
            return
        }


        // return {
        //     id: 1,
        //     userID: 1,
        //     rating: 5,
        //     review: "good airline=",
        //     flightRouteID: 1
        // }
    }

    async create(userFlight: UserFlight): Promise<UserFlight> {
        const rsp = await this.client.post("/api/rate/", { "rate": userFlight })
        if (rsp.status !== 201) {
            throw new Error("create failed, expect http 201")
        }
        return rsp.data

        // return {
        //     id: 1,
        //     userID: 1,
        //     rating: 5,
        //     review: "good airline=",
        //     flightRouteID: 1
        // }
    }

    async update(id: string, userFlight: UserFlight): Promise<UserFlight> {
        const rsp = await this.client.put(`/api/rate/`, { "rate": userFlight })
        if (rsp.status !== 200) {
            throw new Error("create failed, expect http 200")
        }
        return rsp.data

        // return {
        //     id: 1,
        //     userID: 1,
        //     rating: 5,
        //     review: "good airline=",
        //     flightRouteID: 1
        // }
    }

    async delete(id: string): Promise<UserFlight> {
        const rsp = await this.client.delete(`/api/rate/${id}`)
        if (rsp.status !== 204) {
            throw new Error("create failed, expect http 204")
        }
        return rsp.data

        // return {
        //     id: 1,
        //     userID: 1,
        //     rating: 5,
        //     review: "good airline=",
        //     flightRouteID: 1
        // }
    }

}