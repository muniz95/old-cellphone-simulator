import S from '@/shared/ui/base';
import ListItem from '@/shared/ui/list-item';
import { useServiceNumbersController } from '@/features/phone-book/infrastructure/controllers/use-service-numbers-controller';

const ServiceNumbersPage = () => {
  const { contacts } = useServiceNumbersController();

  return (
    <S.MainContainer>
      <S.ResultsBox>
        {contacts.map((contact) => (
          <ListItem key={contact.id ?? `${contact.name}-${contact.number}`}>
            {contact.name}
          </ListItem>
        ))}
      </S.ResultsBox>
    </S.MainContainer>
  );
};

export default ServiceNumbersPage;
