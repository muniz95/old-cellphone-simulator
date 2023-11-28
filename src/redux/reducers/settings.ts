export const color = (state = '', action: any): string => {
  switch(action.type) {
    case "SET_COLOR":
      return action.payload;
    default:
      return state;
  }
}

export const language = (state = '', action: any): string => {
  switch(action.type) {
    case "SET_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
}

export const notificationLevel = (state = 50, action: any): number => {
  switch(action.type) {
    case "SET_NOTIFICATION_LEVEL":
      return action.payload;
    default:
      return state;
  }
}

const SettingsReducer = {
  color,
  language,
  notificationLevel,
};

export default SettingsReducer;