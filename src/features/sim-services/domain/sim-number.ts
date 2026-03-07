import { StorageEntity } from '@/shared/types/storage-entity';

export interface SimNumber extends StorageEntity {
  name: string;
  number: number;
  message: string;
}
