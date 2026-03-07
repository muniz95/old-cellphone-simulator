import S from '@/shared/ui/base';
import TextInput from '@/shared/ui/text-input';
import { useSearchController } from '@/features/phone-book/infrastructure/controllers/use-search-controller';

const SearchPage = () => {
  const { contacts, handleSearch } = useSearchController();

  return (
    <S.MainContainer>
      <TextInput id="name" onChange={handleSearch} />
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

export default SearchPage;
