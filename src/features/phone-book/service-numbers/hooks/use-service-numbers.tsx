import useContacts from '@/entities/contact/api/use-contacts';

export const useServiceNumbers = () => {
  const [contacts] = useContacts();
  return { contacts: contacts.filter((x) => x.isServiceNumber) };
};
