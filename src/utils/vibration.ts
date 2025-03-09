const SUCCESS = [500, 100, 500, 100, 1000];
const RESET = [1000, 100, 100, 100, 100];

export const vibrate = (pattern: number | number[]) => {
  if (window.navigator.vibrate) window.navigator.vibrate(pattern);
};

export const success = () => vibrate(SUCCESS);
export const reset = () => vibrate(RESET);

const vibration = {
  success,
  reset,
  vibrate,
};

export default vibration;
