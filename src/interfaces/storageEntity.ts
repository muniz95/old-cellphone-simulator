import { generateId } from '@/utils/helpers';

export class StorageEntity {
  id?: string = generateId().toString();
  date?: number = Date.now();
}
