import { StorageEntity } from "../interfaces/storageEntity";
import defaults from 'defaults'
import { isPlainObject, generateId } from "./helpers";

export const isOn = () => {
  return localStorage.getItem("appIsOn")!;
}

export const checkDb = () =>
  Boolean(localStorage.getItem("simNumbers")) &&
  Boolean(localStorage.getItem("contacts"));

export const initDb = () => {
  localStorage.setItem("contacts", JSON.stringify([
    {
      id: generateId(),
      date: Date.now(),
      name: "Voice messages",
      number: "100",
      isServiceNumber: true,
    }
  ]));
  localStorage.setItem("simNumbers", JSON.stringify([
    {
      id: generateId(),
      date: Date.now(),
      name: "Provider",
      number: 100,
      message: "This is your provider.",
    },
    {
      id: generateId(),
      date: Date.now(),
      name: "P.O. Box",
      number: 222,
      message: "You have a voice message.",
    }
  ]));
  localStorage.setItem("color", defaults.color);
}

export function getPlain(key: string) {
  return localStorage.getItem(key)!;
}

export function get<T>(key: string) {
  return JSON.parse(localStorage.getItem(key)!) as T;
}

export function set<T>(key: string, value: T) {
  isPlainObject(value)
    ? localStorage.setItem(key, `${value}`)
    : localStorage.setItem(key, JSON.stringify(value));
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
}

export default db;
