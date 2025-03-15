import { combineReducers } from 'redux';
import { CLOSE_MODAL, OPEN_MODAL } from '../constants';
import {
  language,
  notificationLevel,
  alarmLevel,
  ringLevel,
  backlightLevel,
} from './settings';

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

const showStartupScreen = (state = false, action: any): boolean => {
  switch (action.type) {
    case 'CLOSE_STARTUP_SCREEN':
      return false;
    case 'OPEN_STARTUP_SCREEN':
      return true;
    default:
      return state;
  }
};

const reducer = combineReducers({
  showModal,
  showStartupScreen,
  language,
  notificationLevel,
  alarmLevel,
  ringLevel,
  backlightLevel,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
