export const useStartup = () => {
  const matrix = [
    Array(90),
    Array(90),
    Array(90),
    Array(90),
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    Array(90),
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  ];

  return { matrix };
};
