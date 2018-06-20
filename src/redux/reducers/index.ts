import { combineReducers } from "redux";
import { CLOSE_MODAL, OPEN_MODAL } from "../constants";

const showModal = (state = "not finished", action: any) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return false;
    case OPEN_MODAL:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  showModal
});
