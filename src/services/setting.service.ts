import { initDb, set, getPlain } from "../utils/db";

export const resetData = () => {
  initDb();
}

export const getColor = () => {
  return getPlain("color");
}

export const setColor = (color: string) => {
  set<string>("color", color);
}

export const getLanguage = () => {
  return getPlain("language");
}

export const setLanguage = (language: string) => {
  set<string>("language", language);
}

const service = {
  resetData,
  getColor,
  setColor,
  getLanguage,
  setLanguage,
}

export default service;