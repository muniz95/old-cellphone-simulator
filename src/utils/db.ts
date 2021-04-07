export const checkDb = () => {
  return Boolean(localStorage.getItem("contacts"));
}

export const initDb = () => {
  localStorage.setItem("contacts", JSON.stringify([]));
}

export function get<T>(key: string) {
  return JSON.parse(localStorage.getItem(key)!) as T;
}

export function insert<T>(key: string, item: T) {
  const collection = get<T[]>(key);
  collection.push(item);
  localStorage.setItem(key, JSON.stringify(collection));
}

const db = {
  get,
  insert,
}

export default db;
