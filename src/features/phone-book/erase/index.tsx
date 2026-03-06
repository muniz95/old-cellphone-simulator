import { useCallback, useEffect } from 'react';
import S from '@/components/base';
import { Contact } from '@/interfaces/contact';
import useTranslation from '@/hooks/use-translation';
import usePhoneBookErase from './hooks/use-phone-book-erase';
import { useUiStore } from '@/stores/ui-store';

const PhoneBookErase = () => {
  const { t } = useTranslation();
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );

  const { contacts, setCurrentContact, removeContact } = usePhoneBookErase();

  useEffect(() => {
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.MainContainer>
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
    </S.MainContainer>
  );
};

export default PhoneBookErase;
