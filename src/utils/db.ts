import defaults from '@/defaults';
import { StorageEntity } from '../interfaces/storageEntity';
import { isPlainObject } from './helpers';
import seed from './seed';

export const isOn = () => {
  return localStorage.getItem('appIsOn')!;
};

export const ensureInitialData = () => {
  if (!localStorage.getItem('contacts')) {
    localStorage.setItem('contacts', JSON.stringify(seed.contacts));
  }
  if (!localStorage.getItem('simNumbers')) {
    localStorage.setItem('simNumbers', JSON.stringify(seed.simNumbers));
  }
  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(seed.profiles));
  }
  if (!localStorage.getItem('color')) {
    localStorage.setItem('color', defaults.settings.color);
  }
  if (!localStorage.getItem('currentProfile')) {
    localStorage.setItem(
      'currentProfile',
      JSON.stringify(defaults.profiles.currentProfile)
    );
  }
  if (!localStorage.getItem('callRecords')) {
    localStorage.setItem('callRecords', '[]');
  }
  if (!localStorage.getItem('tones')) {
    localStorage.setItem('tones', JSON.stringify(defaults.tones));
  }
};

export function getPlain(key: string) {
  return localStorage.getItem(key)!;
}

export function get<T>(key: string) {
  return JSON.parse(localStorage.getItem(key)!) as T;
}

export function set<T>(key: string, value: T) {
  localStorage.setItem(
    key,
    isPlainObject(value) ? `${value}` : JSON.stringify(value)
  );
}

export function insert<T>(key: string, item: T) {
  const collection = get<T[]>(key);
  collection.push(item);
  localStorage.setItem(key, JSON.stringify(collection));
}

export function update<T extends StorageEntity>(key: string, item: T) {
  const collection = get<T[]>(key).filter((x) => x.id !== item.id);
  collection.push(item);
  localStorage.setItem(key, JSON.stringify(collection));
}

export function remove<T extends StorageEntity>(key: string, item: T) {
  const collection = get<T[]>(key).filter((x) => x.id !== item.id);
  localStorage.setItem(key, JSON.stringify(collection));
}

const db = {
  get,
  getPlain,
  set,
  insert,
  update,
  remove,
};

export default db;
