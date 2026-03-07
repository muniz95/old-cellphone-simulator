import useTranslation from '@/shared/hooks/use-translation';
import S from '@/shared/ui/base';
import TextInput from '@/shared/ui/text-input';
import { useAddNameController } from '@/features/phone-book/infrastructure/controllers/use-add-name-controller';

const AddNamePage = () => {
  const { t } = useTranslation();
  const { handleChange, saveContact } = useAddNameController();

  return (
    <S.MainContainer>
      <div>
        <TextInput id="name" onChange={handleChange} />
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>
        <button onClick={saveContact}>{t('save')}</button>
      </div>
    </S.MainContainer>
  );
};

export default AddNamePage;
