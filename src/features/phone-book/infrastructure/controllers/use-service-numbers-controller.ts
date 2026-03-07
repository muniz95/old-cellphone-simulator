import { useMemo } from 'react';
import useContacts from '@/entities/contact/api/use-contacts';
import { toServiceNumbers } from '@/features/phone-book/domain/use-cases';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';

export const useServiceNumbersController = () => {
  usePhoneBookThirdLevel();

  const [contacts] = useContacts();
  const serviceNumbers = useMemo(() => toServiceNumbers(contacts), [contacts]);

  return { contacts: serviceNumbers };
};
