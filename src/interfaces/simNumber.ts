import { StorageEntity } from './storageEntity';

export interface SimNumber extends StorageEntity {
  name: string;
  number: number;
  message: string;
}
