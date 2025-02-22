export const batteryLevel = (state = 100, action: any): number => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
};

export const isRecharging = (state = false, action: any): boolean => {
  switch (action.type) {
    case 'CHARGING':
      return true;
    case 'UNCHARGING':
      return false;
    default:
      return state;
  }
};

const BatteryReducer = {
  batteryLevel,
  isRecharging,
};

export default BatteryReducer;
