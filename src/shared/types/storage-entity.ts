import { generateId } from '@/shared/lib/helpers';

export class StorageEntity {
  id?: string = generateId().toString();
  date?: number = Date.now();
}
