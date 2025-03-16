import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Menu from '@/features/phone-book/menu';

const menus = [
  { path: '/phonebook/search', title: 'Search' },
  { path: '/phonebook/servicenos', title: 'Service Nos' },
];

describe('Menu Component', () => {
  it('should render the correct menu item', () => {
    const { getByText } = render(
      <Menu
        menus={menus}
        position={0}
        onTap={() => {}}
        onSwipedLeft={() => {}}
        onSwipedRight={() => {}}
      />
    );
    expect(getByText('Search')).toBeTruthy();
  });
});
