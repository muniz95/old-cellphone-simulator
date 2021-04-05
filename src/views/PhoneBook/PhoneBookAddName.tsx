import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/actions";
import '../../styles/Home.scss';

const PhoneBookAddName = () => {
  const dispatch = useDispatch();
  const dispatchOpenModal = React.useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  
  const saveContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (document.getElementById('name') as HTMLInputElement).value
    window.console.log(name)
    window.navigator.vibrate([500, 100, 500, 100, 1000])
    dispatchOpenModal()
  }

  return (
    <div className="home">
      <div>
        <input type="text" name="name" id="name"/>
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>
        <button onClick={saveContact}>Save</button>
      </div>
    </div>
  )
}

export default PhoneBookAddName;
