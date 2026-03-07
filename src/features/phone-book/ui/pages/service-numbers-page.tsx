import S from '@/shared/ui/base';
import { useServiceNumbersController } from '@/features/phone-book/infrastructure/controllers/use-service-numbers-controller';

const ServiceNumbersPage = () => {
  const { contacts } = useServiceNumbersController();

  return (
    <S.MainContainer>
      <S.ResultsBox>
        {contacts.map((contact) => (
          <div key={contact.id ?? `${contact.name}-${contact.number}`}>
            {contact.name}
          </div>
        ))}
      </S.ResultsBox>
    </S.MainContainer>
  );
};

export default ServiceNumbersPage;
