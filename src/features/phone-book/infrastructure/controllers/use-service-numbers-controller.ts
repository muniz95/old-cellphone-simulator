import { useMemo } from 'react';
import useContactsData from '@/features/phone-book/infrastructure/hooks/use-contacts-data';
import { toServiceNumbers } from '@/features/phone-book/domain/use-cases';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';

export const useServiceNumbersController = () => {
  usePhoneBookThirdLevel();

  const [contacts] = useContactsData();
  const serviceNumbers = useMemo(() => toServiceNumbers(contacts), [contacts]);

  return { contacts: serviceNumbers };
};
