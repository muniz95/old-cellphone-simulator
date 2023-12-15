import { generateId } from "../helpers";

const contacts = [
  {
    id: generateId(),
    date: Date.now(),
    name: "Voice messages",
    number: "100",
    isServiceNumber: true,
  }
];

export default contacts;