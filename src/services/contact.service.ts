import db from "../utils/db";

export const getContacts = (): Contact[] => {
  return db.get<Contact[]>("contacts");
}

export const insertContact = (contact: Contact) => {
  db.insert("contacts", contact);
}

const service = {
  getContacts,
  insertContact,
}

export default service;