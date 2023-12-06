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

export const openStartupScreen = () => {
  const action = {
    type: "OPEN_STARTUP_SCREEN"
  };
  return action;
};

export const closeStartupScreen = () => {
  const action = {
    type: "CLOSE_STARTUP_SCREEN"
  };
  return action;
};

export const setFirstLevel = (payload: number) => {
  const action = {
    type: "SET_FIRST_LEVEL",
    payload
  };
  return action;
};

export const setSecondLevel = (payload: number) => {
  const action = {
    type: "SET_SECOND_LEVEL",
    payload
  };
  return action;
};

export const setThirdLevel = (payload: number) => {
  const action = {
    type: "SET_THIRD_LEVEL",
    payload
  };
  return action;
};

export const setFourthLevel = (payload: number) => {
  const action = {
    type: "SET_FOURTH_LEVEL",
    payload
  };
  return action;
};

export const setFifthLevel = (payload: number) => {
  const action = {
    type: "SET_FIFTH_LEVEL",
    payload
  };
  return action;
};
