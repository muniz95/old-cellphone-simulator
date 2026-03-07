import { render, fireEvent } from '@testing-library/react';
import { useSearchController } from '@/features/phone-book/infrastructure/controllers/use-search-controller';
import SearchPage from '@/features/phone-book/ui/pages/search-page';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Contact } from '@/features/phone-book/domain/contact';

vi.mock(
  '@/features/phone-book/infrastructure/controllers/use-search-controller'
);

describe('PhoneBookSearch', () => {
  const mockContacts: Contact[] = [
    { name: 'Alice', isServiceNumber: false, number: '123' },
    { name: 'Bob', isServiceNumber: false, number: '123' },
    { name: 'Charlie', isServiceNumber: false, number: '123' },
    { name: 'David', isServiceNumber: false, number: '123' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSearchController).mockReturnValue({
      search: '',
      contacts: mockContacts,
      handleSearch: vi.fn(),
    });
  });

  it('renders the TextInput component', () => {
    const { getByRole } = render(<SearchPage />);
    expect(getByRole('textbox')).toBeTruthy();
  });

  it('renders all contacts initially', () => {
    const { getByText } = render(<SearchPage />);
    mockContacts.forEach((contact) => {
      expect(getByText(contact.name)).toBeTruthy();
    });
  });

  it('calls handleSearch when input changes', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(useSearchController).mockReturnValue({
      search: '',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });

    const { getByRole } = render(<SearchPage />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockHandleSearch).toHaveBeenCalled();
  });
});
