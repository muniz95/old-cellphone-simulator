import { initDb, get, set } from "../utils/db";

export const resetData = () => {
  initDb();
}

export const getColor = () => {
  return get<string>("color");
}

export const setColor = (color: string) => {
  set<string>("color", color);
}

const service = {
  resetData,
  getColor,
  setColor,
}

export default service;