import { useCallback, useContext, useEffect } from 'react';
import S from './styled';
import TextInput from '@/components/TextInput';
import useTranslation from '@/hooks/use-translation';
import { usePhoneBookEdit } from './hooks/use-phone-book-edit';
import { GlobalContext } from '@/context/global/context';

const PhoneBookEdit = () => {
  const { t } = useTranslation();
  const { setThirdLevel, openModal } = useContext(GlobalContext);
  const dispatchOpenModal = useCallback(() => openModal(), [openModal]);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );

  const { contacts, handleChange, saveContact, setCurrentContact } =
    usePhoneBookEdit(dispatchOpenModal);

  useEffect(() => {
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
