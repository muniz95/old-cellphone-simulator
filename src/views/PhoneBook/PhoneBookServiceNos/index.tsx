import React from "react";
import { Contact } from "../../../interfaces/contact";
import service from "../../../services/contact.service";
import S from "./styled";
import { setThirdLevel } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const PhoneBookServiceNos = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const dispatchSetThirdLevel = React.useCallback(
    (position: number) => dispatch(setThirdLevel(position+1)),
    [dispatch]
  );

  React.useEffect(() => {
    setContacts(service.getServiceNumbers());
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.Home>
      <S.ResultsBox>
        {contacts.map((c) => 
          <div key={c.id}>{c.name}</div>
        )}
      </S.ResultsBox>
    </S.Home>
  )
}

export default PhoneBookServiceNos;
