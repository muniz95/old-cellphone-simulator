import { Contact } from '@/entities/contact/model/contact';
import { NewContactInput } from '@/features/phone-book/domain/types';

const normalize = (value: string) => value.trim().toLowerCase();

const isSameContact = (left: Contact, right: Contact) => {
  if (left.id && right.id) {
    return left.id === right.id;
  }

  return left.name === right.name && left.number === right.number;
};

export const buildNewContact = (
  input: NewContactInput,
  now: number = Date.now()
): Contact => ({
  id: `${now}-${input.number}`,
  date: now,
  name: input.name.trim(),
  number: input.number,
  isServiceNumber: false,
});

export const filterContactsByName = (
  contacts: Contact[],
  searchTerm: string
) => {
  const search = normalize(searchTerm);
  if (!search) return contacts;

  return contacts.filter((contact) => normalize(contact.name).includes(search));
};

export const replaceContact = (contacts: Contact[], updated: Contact) => {
  return contacts.map((contact) =>
    isSameContact(contact, updated) ? updated : contact
  );
};

export const removeContactFromList = (
  contacts: Contact[],
  selected: Contact
) => {
  return contacts.filter((contact) => !isSameContact(contact, selected));
};

export const toServiceNumbers = (contacts: Contact[]) => {
  return contacts.filter((contact) => contact.isServiceNumber);
};
