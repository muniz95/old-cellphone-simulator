import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useContactsData from '@/features/phone-book/infrastructure/hooks/use-contacts-data';
import vibration from '@/shared/lib/vibration';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';
import { buildNewContact } from '@/features/phone-book/domain/use-cases';
import { useUiStore } from '@/app/state/ui-store';

export const useAddNameController = () => {
  usePhoneBookThirdLevel();

  const [contacts, setContacts] = useContactsData();
  const [name, setName] = useState('');
  const openModal = useUiStore((state) => state.openModal);
  const trimmedName = useMemo(() => name.trim(), [name]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }, []);

  const saveContact = useCallback(() => {
    if (!trimmedName) return;

    try {
      const now = Date.now();
      const nextContact = buildNewContact(
        {
          name: trimmedName,
          number: now.toString(),
        },
        now
      );

      setContacts([...contacts, nextContact]);
      vibration.success();
      openModal();
      setName('');
    } catch (error) {
      alert(error);
    }
  }, [contacts, openModal, setContacts, trimmedName]);

  return {
    name,
    handleChange,
    saveContact,
  };
};
