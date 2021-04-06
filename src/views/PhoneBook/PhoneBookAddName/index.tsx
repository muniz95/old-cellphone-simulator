import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/actions";
import S from "./styled";
import service from "../../../services/contact.service"

const PhoneBookAddName = () => {
  const dispatch = useDispatch();
  const dispatchOpenModal = React.useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  
  const saveContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (document.getElementById('name') as HTMLInputElement).value
    try {
      service.insertContact({ name, number: Date.now().toString() });
      window.navigator.vibrate([500, 100, 500, 100, 1000])
      dispatchOpenModal()
    } catch (error) {
      alert(error);
    }
  }

  return (
    <S.Container>
      <div>
        <input type="text" name="name" id="name"/>
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
