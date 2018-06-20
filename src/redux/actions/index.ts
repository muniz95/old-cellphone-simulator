import { CLOSE_MODAL, OPEN_MODAL } from "../constants";

export const openModal = () => {
  const action = {
    type: OPEN_MODAL
  };
  return action;
};

export const closeModal = () => {
  const action = {
    type: CLOSE_MODAL
  };
  return action;
};
