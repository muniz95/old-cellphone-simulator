export const color = (state = '', action: any): string => {
  switch(action.type) {
    case "SET_COLOR":
      return action.payload;
    default:
      return state;
  }
}

const SettingsReducer = {
  color,
};

export default SettingsReducer;