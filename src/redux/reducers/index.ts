import { combineReducers } from "redux";
import { CLOSE_MODAL, OPEN_MODAL } from "../constants";

const showModal = (state = false, action: any): boolean => {
  switch (action.type) {
    case CLOSE_MODAL:
      return false;
    case OPEN_MODAL:
      return true;
    default:
      return state;
  }
};

const reducer = combineReducers({
  showModal,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
