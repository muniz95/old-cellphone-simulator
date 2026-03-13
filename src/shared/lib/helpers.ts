export const generateId = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : crypto.getRandomValues(new Uint16Array(16));

export const generateArray = (positions: number[] | number[][]) => {
  const normalizedPositions = positions.flatMap((position) =>
    Array.isArray(position) ? position : [position]
  );

  if (normalizedPositions.length === 0) {
    return [];
  }

  const length = Math.max(...normalizedPositions) + 1;
  const generatedArray = Array.from({ length }, () => 0);

  normalizedPositions.forEach((position) => {
    if (position >= 0 && position < length) {
      generatedArray[position] = 1;
    }
  });

  return generatedArray;
};
