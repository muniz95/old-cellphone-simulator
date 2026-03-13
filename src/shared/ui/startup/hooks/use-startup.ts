import { generateArray } from '@/shared/lib/helpers';

export const useStartup = () => {
  const startsFrom = (startingIndex: number) => (_: number, index: number) =>
    startingIndex + index;
  const leftHandMatrix = [
    [],
    [],
    [],
    [],
    generateArray([15, 20]),
    [],
    generateArray([9, 12, 20, 23]),
    generateArray([6, 17, 26, 28]),
    generateArray([3, 11, 15, 19, 21, 24, 30, 33, 36]),
    generateArray([1, 8, 13, 16, 18, 20, 22, 25, 35, 37]),
    generateArray([10, 12, 15, 17, 19, 20, 21, 23, 24, 26, 27, 29, 33, 36]),
    generateArray([
      [6, 9, 12, 14],
      [...Array.from({ length: 13 }, startsFrom(16))],
      [30, 32, 34, 35, 36],
    ]),
    generateArray([
      1, 4, 8, 11, 13, 15, 16, 17, 19, 21, 23, 25, 27, 29, 30, 31, 32, 33, 34,
    ]),
    generateArray([6, 7, 9, 10, 12, 14, 15, 17, 18, 19, 20]),
    generateArray([
      [1, 4, 5, 7, 9],
      [...Array.from({ length: 8 }, startsFrom(11))],
      [20, 21],
    ]),
    generateArray([2, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 20, 21, 22]),
    generateArray([
      [3, 5, 7, 8, 9],
      [...Array.from({ length: 9 }, startsFrom(11))],
      [21, 23, 24],
    ]),
    generateArray([
      1, 4, 5, 6, 7, 9, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25,
    ]),
    generateArray([
      [3, 5],
      [...Array.from({ length: 10 }, startsFrom(7))],
      [18, 19, 21, 24, 25, 27],
    ]),
    generateArray([1, 4, 6, 8, 10, 12, 14, 16, 17, 19, 20, 22, 23, 26, 29]),
    generateArray([
      0, 5, 7, 9, 10, 11, 12, 13, 15, 17, 18, 21, 24, 27, 30, 31, 33, 43, 47,
      49, 50,
    ]),

    generateArray([
      4, 6, 8, 10, 12, 14, 16, 19, 22, 28, 30, 32, 34, 36, 38, 41, 43, 44, 45,
      46, 47, 51,
    ]),
    generateArray([
      0, 2, 7, 9, 11, 13, 15, 17, 18, 20, 23, 25, 26, 29, 31, 33, 34, 35, 36,
      37, 39, 44, 45, 50, 51,
    ]),
    generateArray([
      1, 6, 8, 10, 12, 15, 18, 24, 27, 28, 30, 31, 32, 36, 37, 38, 43, 44, 46,
      49, 50, 51, 52,
    ]),
    generateArray([
      0, 3, 11, 13, 16, 19, 22, 26, 28, 29, 31, 36, 38, 42, 43, 44, 45, 49, 50,
      52, 53,
    ]),
    generateArray([
      0, 1, 2, 4, 9, 12, 14, 17, 20, 24, 26, 27, 28, 29, 30, 35, 37, 42, 43, 44,
      46, 48, 49, 50, 54,
    ]),
    generateArray([
      0, 2, 3, 5, 11, 15, 18, 23, 25, 27, 29, 30, 34, 35, 36, 38, 41, 42, 43,
      44, 47, 48, 49, 51, 53, 54,
    ]),
    generateArray([
      0, 1, 2, 4, 7, 14, 20, 22, 24, 25, 26, 27, 28, 29, 33, 34, 35, 40, 41, 42,
      44, 46, 47, 48, 50, 51, 52, 53,
    ]),
    generateArray([
      [0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 17, 19],
      [...Array.from({ length: 8 }, startsFrom(21))],
      [30, 33, 34, 36],
      [...Array.from({ length: 11 }, startsFrom(39))],
    ]),
    generateArray([
      [0, 1, 2, 3, 5, 6, 8, 10, 14, 16],
      [...Array.from({ length: 8 }, startsFrom(18))],
      [27, 29, 32, 33, 34, 35],
      [...Array.from({ length: 8 }, startsFrom(38))],
    ]),
    generateArray([
      [...Array.from({ length: 8 }, startsFrom(1))],
      [
        9, 12, 13, 15, 17, 18, 20, 22, 23, 24, 26, 31, 32, 33, 36, 38, 39, 40,
        42, 43,
      ],
    ]),
    generateArray([
      3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 16, 19, 23, 25, 30, 31, 32, 34, 37, 38,
      39, 40, 41, 42,
    ]),
    generateArray([
      5, 6, 7, 8, 9, 11, 12, 13, 15, 18, 21, 24, 27, 29, 31, 32, 33, 35, 36, 37,
      38, 39, 40, 41,
    ]),
    generateArray([
      7, 8, 9, 10, 11, 13, 14, 16, 17, 20, 22, 25, 27, 28, 29, 30, 31, 32, 34,
      35, 36, 37, 38, 39,
    ]),
    generateArray([
      [...Array.from({ length: 7 }, startsFrom(9))],
      [17, 18, 19, 21],
      [...Array.from({ length: 6 }, startsFrom(23))],
      [...Array.from({ length: 6 }, startsFrom(30))],
    ]),
    generateArray([
      [...Array.from({ length: 9 }, startsFrom(13))],
      [...Array.from({ length: 12 }, startsFrom(23))],
    ]),
    generateArray([...Array.from({ length: 9 }, startsFrom(17))]),
  ];

  return { matrix: leftHandMatrix };
};
