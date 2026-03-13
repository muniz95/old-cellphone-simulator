import { describe, expect, it } from 'vitest';
import { generateArray } from '@/shared/lib/helpers';

describe('helpers.generateArray', () => {
  it('creates a binary array from informed zero-based positions', () => {
    expect(generateArray([1, 4, 5, 6])).toEqual([0, 1, 0, 0, 1, 1, 1]);
  });

  it('returns an empty array when no positions are informed', () => {
    expect(generateArray([])).toEqual([]);
  });

  it('marks repeated and unordered positions only once', () => {
    expect(generateArray([4, 1, 4])).toEqual([0, 1, 0, 0, 1]);
  });

  it('flattens nested position arrays before generating the binary array', () => {
    expect(
      generateArray([
        [1, 4],
        [5, 6],
      ])
    ).toEqual([0, 1, 0, 0, 1, 1, 1]);
  });
});
