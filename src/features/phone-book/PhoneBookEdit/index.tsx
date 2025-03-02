import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setThirdLevel } from '@/redux/actions';
import S from './styled';
import service from '@/services/contact.service';
import TextInput from '@/components/TextInput';
import vibration from '@/utils/vibration';
import { Contact } from '@/interfaces/contact';
import { useTranslation } from 'react-i18next';

const PhoneBookEdit = () => {
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

  const [name, setName] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = useState<Contact>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const saveContact = () => {
    if (!currentContact) return;
    try {
      service.updateContact({
        name,
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
        <TextInput id="name" onChange={handleChange} />
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>
        <button onClick={saveContact}>{t('save')}</button>
      </div>
    </S.Container>
  );
};

export default PhoneBookEdit;
