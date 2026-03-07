import { Contact } from '@/features/phone-book/domain/contact';
import useLocalStorage from '@/shared/hooks/use-local-storage';

const useContacts = () => useLocalStorage<Contact[]>('contacts', []);

export default useContacts;
