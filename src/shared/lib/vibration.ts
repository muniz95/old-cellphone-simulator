const SUCCESS = [500, 100, 500, 100, 1000];
const RESET = [1000, 100, 100, 100, 100];

const vibrate = (pattern: number | number[]) => {
  if (window.navigator.vibrate) window.navigator.vibrate(pattern);
};

const success = () => vibrate(SUCCESS);
const reset = () => vibrate(RESET);

const vibration = {
  success,
  reset,
  vibrate,
};

export default vibration;
