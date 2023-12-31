import {Timestamp} from "./Timestamp.ts";

export interface Toll {
    key: number
    gateId: string
    timestamp: Timestamp
}