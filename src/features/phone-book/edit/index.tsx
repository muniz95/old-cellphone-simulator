import { useCallback, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import S from './styled';
import TextInput from '@/components/TextInput';
import { useTranslation } from 'react-i18next';
import { usePhoneBookEdit } from './hooks/use-phone-book-edit';
import { GlobalContext } from '@/context/global/context';

const PhoneBookEdit = () => {
  const { t } = useTranslation();
  const { setThirdLevel } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const dispatchOpenModal = useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
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
