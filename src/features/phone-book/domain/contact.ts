import { StorageEntity } from '@/shared/types/storage-entity';

export interface Contact extends StorageEntity {
  name: string;
  number: string;
  isServiceNumber: boolean;
}
