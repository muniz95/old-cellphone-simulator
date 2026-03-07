import useTranslation from '@/shared/hooks/use-translation';
import S from '@/shared/ui/base';
import { Contact } from '@/features/phone-book/domain/contact';
import { useEraseController } from '@/features/phone-book/infrastructure/controllers/use-erase-controller';

const ErasePage = () => {
  const { t } = useTranslation();
  const { contacts, setCurrentContact, removeContact } = useEraseController();

  return (
    <S.MainContainer>
      <S.ResultsBox>
        {contacts.map((contact: Contact) => (
          <div
            onClick={() => setCurrentContact(contact)}
            key={contact.id ?? `${contact.name}-${contact.number}`}
          >
            {contact.name}
          </div>
        ))}
      </S.ResultsBox>
      <div>
        <button onClick={removeContact}>{t('erase')}</button>
      </div>
    </S.MainContainer>
  );
};

export default ErasePage;
