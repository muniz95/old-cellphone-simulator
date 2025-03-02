import { render, fireEvent } from '@testing-library/react';
import Menu from '../../../src/features/phone-book/menu';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

describe('Menu Component', () => {
  const menus = [
    { path: '/phonebook/search', title: 'Search' },
    { path: '/phonebook/servicenos', title: 'Service Nos' },
  ];

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

  it('should call onTap when tapped', () => {
    const onTap = vi.fn(() => {
      console.log('tapped');      
    });
    const { getByText } = render(
      <Menu
        menus={menus}
        position={0}
        onTap={onTap}
        onSwipedLeft={() => {}}
        onSwipedRight={() => {}}
      />
    );
    fireEvent.click(getByText('Search'));
    expect(onTap).toHaveBeenCalled();
  });
});