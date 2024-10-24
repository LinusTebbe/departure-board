import type DepartureEntry from "~/interfaces/DepartureEntry";

export default interface DepartureResponse {
    stationName: string,
    currentTime: number,
    departureData: DepartureEntry[],
}