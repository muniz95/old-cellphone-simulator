import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setThirdLevel } from '@/redux/actions';
import S from './styled';
import service from '@/services/contact.service';
import TextInput from '@/components/TextInput';
import vibration from '@/utils/vibration';
import { useTranslation } from 'react-i18next';

const PhoneBookAddName = () => {
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const saveContact = () => {
    try {
      service.insertContact({
        name,
        number: Date.now().toString(),
        isServiceNumber: false,
      });
      vibration.success();
      dispatchOpenModal();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    dispatchSetThirdLevel(0);
  });

  return (
    <S.Container>
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

export default PhoneBookAddName;
