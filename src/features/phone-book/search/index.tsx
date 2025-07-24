import S from './styled';
import TextInput from '@/components/text-input/index';
import usePhoneBookSearch from '@/features/phone-book/search/hooks/use-phone-book-search';
import useThirdLevel from '@/hooks/use-third-level';

const PhoneBookSearch = () => {
  const { search, contacts, handleSearch } = usePhoneBookSearch();

  useThirdLevel(0);

  return (
    <S.Home>
      <TextInput id="name" onChange={handleSearch} />
      <S.ResultsBox>
        {contacts
          .filter((c) => c.name.includes(search))
          .map((c) => (
            <div key={c.name}>{c.name}</div>
          ))}
      </S.ResultsBox>
    </S.Home>
  );
};

export default PhoneBookSearch;
