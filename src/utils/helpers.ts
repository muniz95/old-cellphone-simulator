export const isBetween = (value: number, min: number, max: number) =>
  value >= min && value <= max;

export const isPlainObject = (value: any) =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean' ||
  typeof value === 'object';

const helpers = {
  isBetween,
  isPlainObject,
};

export default helpers;