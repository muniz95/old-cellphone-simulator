import { describe, expect, it } from 'vitest';
import DotMatrix from '@/shared/ui/dot-matrix';
import { render } from '@testing-library/react';

describe('DotMatrix', () => {
  const exampleMatrix = [
    [1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1],
  ];

  const getPixel = (container: HTMLElement, x: number, y: number) =>
    container.querySelector(`[data-x="${x}"][data-y="${y}"]`);

  it('renders a matrix of 8x8', () => {
    const { container } = render(
      <DotMatrix matrix={[]} yAxisLength={8} xAxisLength={8} />
    );

    expect(container).toBeTruthy();

    const pixels = container.getElementsByClassName('pixel');
    expect(pixels.length).toEqual(64);
  });

  it('maps rows[y][x] values to active and inactive dots', () => {
    const { container } = render(
      <DotMatrix matrix={exampleMatrix} yAxisLength={8} xAxisLength={8} />
    );

    expect(getPixel(container, 0, 0)?.getAttribute('data-active')).toBe('true');
    expect(getPixel(container, 3, 0)?.getAttribute('data-active')).toBe('true');
    expect(getPixel(container, 4, 0)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(getPixel(container, 1, 1)?.getAttribute('data-active')).toBe(
      'false'
    );
  });

  it('pads missing cells as inactive', () => {
    const { container } = render(
      <DotMatrix
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        yAxisLength={4}
        xAxisLength={4}
      />
    );

    expect(getPixel(container, 0, 0)?.getAttribute('data-active')).toBe('true');
    expect(getPixel(container, 1, 0)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(getPixel(container, 3, 0)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(getPixel(container, 0, 3)?.getAttribute('data-active')).toBe(
      'false'
    );
  });

  it('ignores overflow cells outside the declared matrix size', () => {
    const { container } = render(
      <DotMatrix
        matrix={[
          [1, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
        ]}
        yAxisLength={2}
        xAxisLength={2}
      />
    );

    const pixels = container.getElementsByClassName('pixel');

    expect(pixels.length).toEqual(4);
    expect(getPixel(container, 1, 1)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(container.querySelector('[data-x="2"][data-y="0"]')).toBeNull();
    expect(container.querySelector('[data-x="0"][data-y="2"]')).toBeNull();
  });

  it('renders an empty matrix as fully inactive', () => {
    const { container } = render(
      <DotMatrix matrix={[]} yAxisLength={2} xAxisLength={2} />
    );

    expect(getPixel(container, 0, 0)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(getPixel(container, 1, 0)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(getPixel(container, 0, 1)?.getAttribute('data-active')).toBe(
      'false'
    );
    expect(getPixel(container, 1, 1)?.getAttribute('data-active')).toBe(
      'false'
    );
  });
});
