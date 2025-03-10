export const color = (state = '', action: any): string => {
  switch (action.type) {
    case 'SET_COLOR':
      return action.payload;
    default:
      return state;
  }
};

export const language = (state = '', action: any): string => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};

export const notificationLevel = (state = 50, action: any): number => {
  switch (action.type) {
    case 'SET_NOTIFICATION_LEVEL':
      return action.payload;
    default:
      return state;
  }
};

export const alarmLevel = (state = 50, action: any): number => {
  switch (action.type) {
    case 'SET_ALARM_LEVEL':
      return action.payload;
    default:
      return state;
  }
};

export const ringLevel = (state = 50, action: any): number => {
  switch (action.type) {
    case 'SET_RING_LEVEL':
      return action.payload;
    default:
      return state;
  }
};

export const backlightLevel = (state = 80, action: any): number => {
  switch (action.type) {
    case 'SET_BACKLIGHT_LEVEL':
      return action.payload;
    default:
      return state;
  }
};

export const inactivityTime = (state = 60, action: any): number => {
  switch (action.type) {
    case 'SET_INACTIVITY_TIME':
      return action.payload;
    default:
      return state;
  }
};

const SettingsReducer = {
  color,
  language,
  notificationLevel,
  alarmLevel,
  ringLevel,
  backlightLevel,
  inactivityTime,
};

export default SettingsReducer;
