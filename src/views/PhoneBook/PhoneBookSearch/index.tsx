import React from "react";
import service from "../../../services/contact.service";
import S from "./styled";
import TextInput from "../../../components/TextInput"
import { useDispatch } from "react-redux";
import { setThirdLevel } from "../../../redux/actions";

const PhoneBookSearch = () => {
  const dispatch = useDispatch();
  const dispatchSetThirdLevel = React.useCallback(
    (position) => dispatch(setThirdLevel(position+1)),
    [dispatch]
  );
  const [search, setSearch] = React.useState('');
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  }
  React.useEffect(() => {
    setContacts(service.getContacts());
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.Home>
      <TextInput id="name" onChange={handleSearch} />
      <S.ResultsBox>
        {contacts.filter((c) => c.name.includes(search)).map((c) => 
          <div key={c.name}>{c.name}</div>
        )}
      </S.ResultsBox>
    </S.Home>
  )
}

export default PhoneBookSearch;
