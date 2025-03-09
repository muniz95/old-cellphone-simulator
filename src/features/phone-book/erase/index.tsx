import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setThirdLevel } from '@/redux/actions';
import S from './styled';
import { Contact } from '@/interfaces/contact';
import { useTranslation } from 'react-i18next';
import usePhoneBookErase from './hooks/use-phone-book-erase';

const PhoneBookErase = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dispatchSetThirdLevel = useCallback(
    (position: number) => dispatch(setThirdLevel(position + 1)),
    [dispatch]
  );

  const { contacts, setCurrentContact, removeContact } = usePhoneBookErase();

  useEffect(() => {
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.Container>
      <S.ResultsBox>
        {contacts.map((c: Contact) => (
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
