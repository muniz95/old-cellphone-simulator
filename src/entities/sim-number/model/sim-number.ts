import { StorageEntity } from '@/entities/shared/model/storage-entity';

export interface SimNumber extends StorageEntity {
  name: string;
  number: number;
  message: string;
}
