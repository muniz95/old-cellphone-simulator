import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ListItem from '@/shared/ui/list-item';

describe('ListItem', () => {
  it('renders a static item when click handler is not provided', () => {
    const { getByTestId, queryByRole } = render(<ListItem>Profile 1</ListItem>);

    expect(getByTestId('list-item').textContent).toBe('Profile 1');
    expect(queryByRole('button')).toBeNull();
  });

  it('renders an interactive item and triggers onClick', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ListItem onClick={onClick} testId="profile-item">
        Profile 2
      </ListItem>
    );

    const button = getByRole('button', { name: 'Profile 2' });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
