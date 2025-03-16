import { render, fireEvent } from '@testing-library/react';
import usePhoneBookSearch from '@/features/phone-book/search/hooks/use-phone-book-search';
import useThirdLevel from '@/hooks/use-third-level';
import PhoneBookSearch from '@/features/phone-book/search';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Contact } from '@/interfaces/contact';

vi.mock('@/features/phone-book/search/hooks/use-phone-book-search');
vi.mock('@/hooks/use-third-level');

describe('PhoneBookSearch', () => {
  const mockContacts: Contact[] = [
    { name: 'Alice', isServiceNumber: false, number: '123' },
    { name: 'Bob', isServiceNumber: false, number: '123' },
    { name: 'Charlie', isServiceNumber: false, number: '123' },
    { name: 'David', isServiceNumber: false, number: '123' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock the usePhoneBookSearch hook
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: '',
      contacts: mockContacts,
      handleSearch: vi.fn(),
    });

    // Mock the useThirdLevel hook
    vi.mocked(useThirdLevel).mockImplementation(() => {});
  });

  it('renders the TextInput component', () => {
    const { getByRole } = render(<PhoneBookSearch />);
    expect(getByRole('textbox')).toBeTruthy();
  });

  it('renders all contacts initially', () => {
    const { getByText } = render(<PhoneBookSearch />);
    mockContacts.forEach((contact) => {
      expect(getByText(contact.name)).toBeTruthy();
    });
  });

  it('filters contacts based on search input', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: 'A',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });

    const { getByText, queryByText } = render(<PhoneBookSearch />);
    expect(getByText('Alice')).toBeTruthy();
    expect(queryByText('Charlie')).not.toBeTruthy();
    expect(queryByText('Bob')).not.toBeTruthy();
    expect(queryByText('David')).not.toBeTruthy();
  });

  it('calls handleSearch when input changes', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: '',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });

    const { getByRole } = render(<PhoneBookSearch />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('calls useThirdLevel with 0', () => {
    render(<PhoneBookSearch />);
    expect(useThirdLevel).toHaveBeenCalledWith(0);
  });
});
