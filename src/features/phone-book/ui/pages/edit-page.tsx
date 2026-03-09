import useTranslation from '@/shared/hooks/use-translation';
import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import TextInput from '@/shared/ui/text-input';
import { useEditController } from '@/features/phone-book/infrastructure/controllers/use-edit-controller';

const EditPage = () => {
  const { t } = useTranslation();
  const { contacts, handleChange, saveContact, selectContact } =
    useEditController();

  return (
    <S.MainContainer>
      <S.ResultsBox>
        {contacts.map((contact) => (
          <div
            onClick={() => selectContact(contact)}
            key={contact.id ?? `${contact.name}-${contact.number}`}
          >
            {contact.name}
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
        <UiButton onClick={saveContact}>{t('save')}</UiButton>
      </div>
    </S.MainContainer>
  );
};

export default EditPage;
