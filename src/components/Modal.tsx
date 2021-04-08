import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { closeModal } from "../redux/actions";
import { RootState } from "../redux/reducers";
import '../styles/Modal.scss';


const Modal = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const dispatchCloseModal = React.useCallback(
    () => dispatch(closeModal()),
    [dispatch]
  );
  const showModal = useSelector((state: RootState) => state.showModal);
  
  let checked = false
  if (showModal) {
    setTimeout(() => {
      const location = {
        pathname: '/'
      }
      dispatchCloseModal()
      props.history.push(location)
    }, 3000)
    checked = true
  }
  return (
    <div className="modal" style={{display: showModal ? 'flex' : 'none'}}>
      <div className="modal-content">
        <input type="checkbox" name="ok" id="ok" style={{opacity: 0}} checked={checked} />
        <label htmlFor="ok">
          <span>&nbsp;</span>
          <ins><i>Done!</i></ins>
        </label>
      </div>
    </div>
  )
};

export default withRouter(Modal);
