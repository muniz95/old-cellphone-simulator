import S from '@/shared/ui/base';
import TextInput from '@/shared/ui/text-input';
import usePhoneBookSearch from '@/features/phone-book/search/hooks/use-phone-book-search';
import useThirdLevel from '@/shared/hooks/use-third-level';

const PhoneBookSearch = () => {
  const { search, contacts, handleSearch } = usePhoneBookSearch();

  useThirdLevel(0);

  return (
    <S.MainContainer>
      <TextInput id="name" onChange={handleSearch} />
      <S.ResultsBox>
        {contacts
          .filter((c) => c.name.includes(search))
          .map((c) => (
            <div key={c.name}>{c.name}</div>
          ))}
      </S.ResultsBox>
    </S.MainContainer>
  );
};

export default PhoneBookSearch;
