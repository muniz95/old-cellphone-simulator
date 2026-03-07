import { StorageEntity } from '@/entities/shared/model/storage-entity';

export interface Contact extends StorageEntity {
  name: string;
  number: string;
  isServiceNumber: boolean;
}
