import { useCallback, useEffect, useState } from 'react';
import service from '../../../services/contact.service';
import S from './styled';
import TextInput from '../../../components/TextInput';
import { useDispatch } from 'react-redux';
import { setThirdLevel } from '../../../redux/actions';
import { Contact } from '../../../interfaces/contact';

const PhoneBookSearch = () => {
  const dispatch = useDispatch();
  const dispatchSetThirdLevel = useCallback(
    (position: number) => dispatch(setThirdLevel(position + 1)),
    [dispatch]
  );
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    setContacts(service.getContacts());
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

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
