import { Contact } from '@/entities/contact/model/contact';
import useLocalStorage from '@/shared/hooks/use-local-storage';

const useContacts = () => useLocalStorage<Contact[]>('contacts', []);

export default useContacts;
