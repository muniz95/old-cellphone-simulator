import { StorageEntity } from "./storageEntity";

export interface CallRecord extends StorageEntity {
  contactName: string
  type: "received" | "outgoing"
  number: string
  startDate: number
  endDate: number
}