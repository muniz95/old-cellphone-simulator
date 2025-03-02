import S from './styled';
import TextInput from '@/components/text-input';
import { useTranslation } from 'react-i18next';
import useThirdLevel from '@/hooks/use-third-level';
import { usePhoneBookAddNameHooks } from './hooks/use-add-name-hooks';

const PhoneBookAddName = () => {
  const { t } = useTranslation();
  const { handleChange, saveContact } = usePhoneBookAddNameHooks();

  useThirdLevel();

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
