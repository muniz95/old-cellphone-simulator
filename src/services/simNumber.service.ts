import { SimNumber } from "../interfaces/simNumber";
import db from "../utils/db";

export const getSimNumbers = (): SimNumber[] => {
  return db.get<SimNumber[]>("simNumbers");
};

const service = {
  getSimNumbers,
}

export default service;