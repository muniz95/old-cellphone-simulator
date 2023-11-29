import { initDb, set, getPlain } from "../utils/db";

export const resetData = () => {
  initDb();
}

export const getColor = () => getPlain("color");

export const setColor = (color: string) => {
  set<string>("color", color);
}

export const getLanguage = () => getPlain("language");

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

export const getBacklightLevel = () => parseInt(getPlain("backlightLevel"));

export const setBacklightLevel = (level: number) => {
  set<number>("backlightLevel", level);
}

export const setInactivityTime = (time: number) => {
  set<number>("inactivityTime", time);
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
  getBacklightLevel,
  setBacklightLevel,
  setInactivityTime,
}

export default service;