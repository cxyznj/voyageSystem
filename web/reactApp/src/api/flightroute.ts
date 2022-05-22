import { AxiosInstance } from "axios";
import { PAGINATION_COUNT } from ".";
import { Flightroute } from "./models/Flightroute";

export default class FlightrouteAPI {
    client: AxiosInstance;
    constructor(client: AxiosInstance) {
        this.client = client
    }

    async list(ori: string, des: string, airline: string, page: number = 1): Promise<[Flightroute[], number]> {
        let url = `/api/routes?page=${page}`
        if (ori !== "") {
            url += `&sourceAirport=${ori}`
        }
        if (des !== "") {
            url += `&destinationAirport=${des}`
        }
        if (airline !== "") {
            url += `&airline=${airline}`
        }

        const rsp = await this.client.get(url)
        if (rsp.status !== 200) {
            throw new Error("list questions failed, expect http 200")
        }
        return this._getFlightroutePagePair(rsp.data)

        // return [[
        //     {
        //         flightRouteID: 1,
        //         airline: "2B",
        //         sourceAirport: "ASF",
        //         destinationAirport: "KZN",
        //         stops: 0,
        //         equipment: "CR2",
        //         sourceID: 2966,
        //         destinationID: 2967,
        //     },
        //     {
        //         flightRouteID: 2,
        //         airline: "2B",
        //         sourceAirport: "ASF",
        //         destinationAirport: "KZN",
        //         stops: 0,
        //         equipment: "CR2",
        //         sourceID: 2966,
        //         destinationID: 2967,
        //     },
        // ], 20]
    }

    async listHistory(page: number = 1): Promise<[Flightroute[], number]> {
        let url = `/api/history?page=${page}`

        const rsp = await this.client.get(url)
        if (rsp.status !== 200) {
            throw new Error("list questions failed, expect http 200")
        }

        console.log(rsp.data)
        return this._getFlightroutePagePair(rsp.data)

        // return [[
        //     {
        //         flightRouteID: 1,
        //         airline: "2B",
        //         sourceAirport: "ASF",
        //         destinationAirport: "KZN",
        //         stops: 0,
        //         equipment: "CR2",
        //         sourceID: 2966,
        //         destinationID: 2967,
        //     },
        //     {
        //         flightRouteID: 2,
        //         airline: "2B",
        //         sourceAirport: "ASF",
        //         destinationAirport: "KZN",
        //         stops: 0,
        //         equipment: "CR2",
        //         sourceID: 2966,
        //         destinationID: 2967,
        //     },
        // ], 20]
    }

    async listOrder(page: number = 1): Promise<[Flightroute[], number]> {
        let url = `/api/toproute/?page=${page}`

        const rsp = await this.client.get(url)
        if (rsp.status !== 200) {
            throw new Error("list questions failed, expect http 200")
        }
        console.log(rsp.data)
        return this._getFlightroutePagePair(rsp.data)

        // return [[
        //     {
        //         flightRouteID: 1,
        //         airline: "hhhhhhhh",
        //         sourceAirport: "ASF",
        //         destinationAirport: "KZN",
        //         stops: 0,
        //         equipment: "CR2",
        //         sourceID: 2966,
        //         destinationID: 2967,
        //     },
        //     {
        //         flightRouteID: 2,
        //         airline: "2B",
        //         sourceAirport: "ASF",
        //         destinationAirport: "KZN",
        //         stops: 0,
        //         equipment: "CR2",
        //         sourceID: 2966,
        //         destinationID: 2967,
        //     },
        // ], 20]
    }

    async findByID(fid: string): Promise<Flightroute> {
        const rsp = await this.client.get(`/api/routes/${fid}`)
        if (rsp.status !== 200) {
            throw new Error("expect http 200")
        }
        return rsp.data

        // return {
        //     flightRouteID: 1,
        //     airline: "2B",
        //     sourceAirport: "ASF",
        //     destinationAirport: "KZN",
        //     stops: 0,
        //     equipment: "CR2",
        //     sourceID: 2966,
        //     destinationID: 2967,
        // }
    }

    _getFlightroutePagePair(data: any): [Flightroute[], number] {
        return [data.results, Math.ceil(data.count / PAGINATION_COUNT)]
    }

}