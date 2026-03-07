import { Contact } from '@/entities/contact/model/contact';

export interface PhoneBookMenuItem {
  path: string;
  title: string;
}

export interface NewContactInput {
  name: string;
  number: string;
}

export type PhoneBookContact = Contact;
