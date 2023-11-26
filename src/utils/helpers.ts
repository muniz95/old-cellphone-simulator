export const isBetween = (value: number, min: number, max: number) =>
  value >= min && value <= max;

const helpers = {
  isBetween
};

export default helpers;