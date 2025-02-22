import { StorageEntity } from './storageEntity';

export interface CallRecord extends StorageEntity {
  contactName: string;
  type: 'received' | 'outgoing';
  phone: string;
  startDate: number;
  endDate: number;
}
