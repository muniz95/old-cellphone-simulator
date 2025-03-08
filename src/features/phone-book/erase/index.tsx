import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setThirdLevel } from '@/redux/actions';
import S from './styled';
import service from '@/services/contact.service';
import vibration from '@/utils/vibration';
import { Contact } from '@/interfaces/contact';
import { useTranslation } from 'react-i18next';

const PhoneBookErase = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dispatchOpenModal = useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  const dispatchSetThirdLevel = useCallback(
    (position: number) => dispatch(setThirdLevel(position + 1)),
    [dispatch]
  );

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = useState<Contact>();

  const removeContact = () => {
    if (!currentContact) return;
    try {
      service.removeContact({
        name: '',
        number: currentContact.number,
        id: currentContact.id,
        date: currentContact.date,
        isServiceNumber: false,
      });
      vibration.success();
      dispatchOpenModal();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setContacts(service.getContacts());
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.Container>
      <S.ResultsBox>
        {contacts.map((c) => (
          <div onClick={() => setCurrentContact(c)} key={c.name}>
            {c.name}
          </div>
        ))}
      </S.ResultsBox>
      <div>
        <button onClick={removeContact}>{t('erase')}</button>
      </div>
    </S.Container>
  );
};

export default PhoneBookErase;
