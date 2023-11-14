import { Contact } from "../interfaces/contact";
import db from "../utils/db";

export const getContacts = (): Contact[] => {
  return db.get<Contact[]>("contacts");
}

export const insertContact = (contact: Contact) => {
  db.insert("contacts", contact);
}

export const updateContact = (contact: Contact) => {
  db.update("contacts", contact);
}

const service = {
  getContacts,
  insertContact,
  updateContact,
}

export default service;