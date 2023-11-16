import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setThirdLevel } from "../../../redux/actions";
import S from "./styled";
import service from "../../../services/contact.service"
import TextInput from "../../../components/TextInput";
import vibration from "../../../utils/vibration";
import { Contact } from "../../../interfaces/contact";

const PhoneBookErase = () => {
  const dispatch = useDispatch();
  const dispatchOpenModal = React.useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  const dispatchSetThirdLevel = React.useCallback(
    (position: number) => dispatch(setThirdLevel(position+1)),
    [dispatch]
  );

  const [name, setName] = React.useState("");
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = React.useState<Contact>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }
  
  const removeContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      service.removeContact({
        name,
        number: currentContact?.number!,
        id: currentContact?.id!,
        date: currentContact?.date!,
        isServiceNumber: false,
      });
      vibration.success();
      dispatchOpenModal()
    } catch (error) {
      alert(error);
    }
  }

  React.useEffect(() => {
    setContacts(service.getContacts());
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.Container>
      <S.ResultsBox>
        {contacts.map((c) => 
          <div onClick={() => setCurrentContact(c)} key={c.name}>{c.name}</div>
        )}
      </S.ResultsBox>
      <div>
        <button onClick={removeContact}>Erase</button>
      </div>
    </S.Container>
  );
}

export default PhoneBookErase;
