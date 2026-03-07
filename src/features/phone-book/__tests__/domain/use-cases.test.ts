import { describe, expect, it } from 'vitest';
import { Contact } from '@/entities/contact/model/contact';
import {
  buildNewContact,
  filterContactsByName,
  removeContactFromList,
  replaceContact,
  toServiceNumbers,
} from '@/features/phone-book/domain/use-cases';

describe('phone-book domain use-cases', () => {
  it('builds a normalized contact payload', () => {
    const now = 123456;
    const contact = buildNewContact(
      {
        name: '  Alice  ',
        number: '999',
      },
      now
    );

    expect(contact.name).toBe('Alice');
    expect(contact.number).toBe('999');
    expect(contact.id).toBe('123456-999');
    expect(contact.date).toBe(now);
    expect(contact.isServiceNumber).toBe(false);
  });

  it('filters contacts by name (case-insensitive)', () => {
    const contacts: Contact[] = [
      { id: '1', name: 'Alice', number: '1', isServiceNumber: false },
      { id: '2', name: 'Bob', number: '2', isServiceNumber: false },
      { id: '3', name: 'ALAN', number: '3', isServiceNumber: true },
    ];

    const filtered = filterContactsByName(contacts, 'al');
    expect(filtered.map((contact) => contact.name)).toEqual(['Alice', 'ALAN']);
  });

  it('replaces the selected contact in a list', () => {
    const contacts: Contact[] = [
      { id: '1', name: 'Alice', number: '1', isServiceNumber: false },
      { id: '2', name: 'Bob', number: '2', isServiceNumber: false },
    ];

    const updated: Contact = {
      id: '2',
      name: 'Bobby',
      number: '2',
      isServiceNumber: false,
    };

    const next = replaceContact(contacts, updated);
    expect(next).toEqual([
      { id: '1', name: 'Alice', number: '1', isServiceNumber: false },
      { id: '2', name: 'Bobby', number: '2', isServiceNumber: false },
    ]);
  });

  it('removes the selected contact from a list', () => {
    const contacts: Contact[] = [
      { id: '1', name: 'Alice', number: '1', isServiceNumber: false },
      { id: '2', name: 'Bob', number: '2', isServiceNumber: false },
    ];

    const next = removeContactFromList(contacts, contacts[0]);
    expect(next).toEqual([
      { id: '2', name: 'Bob', number: '2', isServiceNumber: false },
    ]);
  });

  it('extracts only service numbers', () => {
    const contacts: Contact[] = [
      { id: '1', name: 'Alice', number: '1', isServiceNumber: false },
      { id: '2', name: 'Voicemail', number: '100', isServiceNumber: true },
    ];

    expect(toServiceNumbers(contacts)).toEqual([
      { id: '2', name: 'Voicemail', number: '100', isServiceNumber: true },
    ]);
  });
});
