import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SwipeMenu from '@/features/phone-book/ui/components/swipe-menu';

describe('Menu Component', () => {
  it('should render the correct menu item', () => {
    const { getByText } = render(
      <SwipeMenu
        label="Search"
        onTap={() => {}}
        onSwipedLeft={() => {}}
        onSwipedRight={() => {}}
      />
    );
    expect(getByText('Search')).toBeTruthy();
  });
});
