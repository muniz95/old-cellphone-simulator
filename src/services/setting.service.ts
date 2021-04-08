import { initDb } from "../utils/db";

export const resetData = () => {
  initDb();
}

const service = {
  resetData,
}

export default service;