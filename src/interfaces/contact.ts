import { StorageEntity } from "./storageEntity";

export interface Contact extends StorageEntity {
  name: string
  number: string,
  isServiceNumber: boolean,
}