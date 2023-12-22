export const isBetween = (value: number, min: number, max: number) =>
  value >= min && value <= max;

export const isPlainObject = (value: any) =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean' ||
  typeof value === 'object';

export const generateId = () =>
  crypto.randomUUID ? crypto.randomUUID() : crypto.getRandomValues(new Uint16Array(16));

export const formatTime = (seconds: number) =>
  (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds;

const helpers = {
  isBetween,
  isPlainObject,
  generateId,
  formatTime,
};

export default helpers;