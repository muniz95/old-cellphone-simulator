import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/actions";
import S from "./styled";
import service from "../../../services/contact.service"
import TextInput from "../../../components/TextInput";
import vibration from "../../../utils/vibration";

const PhoneBookAddName = () => {
  const dispatch = useDispatch();
  const dispatchOpenModal = React.useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  const [name, setName] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }
  
  const saveContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      service.insertContact({ name, number: Date.now().toString() });
      vibration.success();
      dispatchOpenModal()
    } catch (error) {
      alert(error);
    }
  }

  return (
    <S.Container>
      <div>
        <TextInput id="name" onChange={handleChange} />
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>
        <button onClick={saveContact}>Save</button>
      </div>
    </S.Container>
  )
}

export default PhoneBookAddName;
