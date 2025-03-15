import useContacts from '@/hooks/persistence/use-contacts';

export const useServiceNumbers = () => {
  const [contacts] = useContacts();
  return { contacts: contacts.filter((x) => x.isServiceNumber) };
};
