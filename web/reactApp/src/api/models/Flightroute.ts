export interface Flightroute {
    flightRouteID: number
    airline: string
    sourceAirport: string
    destinationAirport: string
    stops: number
    equipment: string
    sourceID: number
    destinationID: number
    airlineName?: string
    AVGRating?: number
    reviewNum?: number
}
