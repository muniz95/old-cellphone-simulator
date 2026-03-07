import { create } from 'zustand';
import { Contact } from '@/features/phone-book/domain/contact';

interface ContactsState {
  contacts: Contact[];
  hydrated: boolean;
  setContacts: (contacts: Contact[]) => void;
  hydrate: (contacts: Contact[]) => void;
}

const initialContactsState = {
  contacts: [] as Contact[],
  hydrated: false,
};

export const useContactsStore = create<ContactsState>((set) => ({
  ...initialContactsState,
  setContacts: (contacts) => set({ contacts }),
  hydrate: (contacts) => set({ contacts, hydrated: true }),
}));

export const resetContactsStore = () => {
  useContactsStore.setState(initialContactsState);
};
