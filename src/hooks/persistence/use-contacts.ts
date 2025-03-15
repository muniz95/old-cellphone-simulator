import { Contact } from '@/interfaces/contact';
import useLocalStorage from '@/hooks/use-local-storage';

const useContacts = () => useLocalStorage<Contact[]>('contacts', []);

export default useContacts;
