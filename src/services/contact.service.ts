import { Contact } from "../interfaces/contact";
import db from "../utils/db";

export const getContacts = (): Contact[] => {
  return db.get<Contact[]>("contacts");
}

export const getServiceNumbers = (): Contact[] => {
  return db.get<Contact[]>("contacts").filter(x => x.isServiceNumber);
}

export const insertContact = (contact: Contact) => {
  db.insert("contacts", contact);
}

export const updateContact = (contact: Contact) => {
  db.update("contacts", contact);
}

const service = {
  getContacts,
  getServiceNumbers,
  insertContact,
  updateContact,
}

export default service;