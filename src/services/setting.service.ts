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

export const setNotificationLevel = (level: number) => {
  set<number>("notificationLevel", level);
}

export const setAlarmLevel = (level: number) => {
  set<number>("alarmLevel", level);
}

export const setRingLevel = (level: number) => {
  set<number>("ringLevel", level);
}

const service = {
  resetData,
  getColor,
  setColor,
  getLanguage,
  setLanguage,
  setNotificationLevel,
  setAlarmLevel,
  setRingLevel,
}

export default service;