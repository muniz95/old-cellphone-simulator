import { Contact } from '@/features/phone-book/domain/contact';
import useIndexedDb from '@/shared/hooks/use-indexed-db';

const useContacts = () => useIndexedDb<Contact[]>('contacts', []);

export default useContacts;
