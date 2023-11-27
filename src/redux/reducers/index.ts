import { combineReducers } from "redux";
import { CLOSE_MODAL, OPEN_MODAL } from "../constants";
import { batteryLevel, isRecharging } from "./battery";
import { color } from "./settings";

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

const firstLevel = (state = 1, action: any): number => {
  switch(action.type) {
    case "SET_FIRST_LEVEL":
      return action.payload;
    default:
      return state;
  }
}

const secondLevel = (state = 0, action: any): number => {
  switch(action.type) {
    case "SET_SECOND_LEVEL":
      return action.payload;
    default:
      return state;
  }
}

const thirdLevel = (state = 0, action: any): number => {
  switch(action.type) {
    case "SET_THIRD_LEVEL":
      return action.payload;
    default:
      return state;
  }
}

const fourthLevel = (state = 0, action: any): number => {
  switch(action.type) {
    case "SET_FOURTH_LEVEL":
      return action.payload;
    default:
      return state;
  }
}

const fifthLevel = (state = 0, action: any): number => {
  switch(action.type) {
    case "SET_FIFTH_LEVEL":
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  showModal,
  firstLevel,
  secondLevel,
  thirdLevel,
  fourthLevel,
  fifthLevel,
  batteryLevel,
  isRecharging,
  color,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
