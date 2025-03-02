import { StorageEntity } from '../interfaces/storageEntity';
import defaults from '@/defaults';
import seed from './seed/index';
import { isPlainObject } from './helpers';

export const isOn = () => {
  return localStorage.getItem('appIsOn')!;
};

export const checkDb = () =>
  Boolean(localStorage.getItem('simNumbers')) &&
  Boolean(localStorage.getItem('profiles')) &&
  Boolean(localStorage.getItem('contacts')) &&
  Boolean(localStorage.getItem('callRecords'));

export const initDb = () => {
  localStorage.setItem('contacts', JSON.stringify(seed.contacts));
  localStorage.setItem('simNumbers', JSON.stringify(seed.simNumbers));
  localStorage.setItem('profiles', JSON.stringify(seed.profiles));
  localStorage.setItem('color', defaults.color);
  localStorage.setItem('currentProfile', JSON.stringify(defaults.profile));
  localStorage.setItem('callRecords', '[]');
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
