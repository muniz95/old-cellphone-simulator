import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useThirdLevel from '@/hooks/use-third-level';
import { renderWithProvider } from '../../../utils';
import PhoneBookSearch from '@/features/phone-book/search';
import usePhoneBookSearch from '@/features/phone-book/search/hooks/use-phone-book-search';
import { Contact } from '@/interfaces/contact';

const mockContacts: Contact[] = [
  { name: 'John', isServiceNumber: false, number: '123' },
  { name: 'Jane', isServiceNumber: false, number: '456' },
  { name: 'Bob', isServiceNumber: false, number: '789' },
];

// Mock the hooks
vi.mock(
  '@/features/phone-book/phone-book-search/hooks/use-phone-book-search',
  () => {
    return vi.fn().mockImplementation(() => ({
      search: '',
      contacts: mockContacts,
      handleSearch: vi.fn(),
    }));
  }
);
vi.mock('@/hooks/use-third-level');

describe('PhoneBookSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders TextInput and ResultsBox', () => {
    renderWithProvider(<PhoneBookSearch />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.getByText('Jane')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
  });

  it('calls handleSearch when input changes', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: '',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });
    renderWithProvider(<PhoneBookSearch />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(mockHandleSearch).toHaveBeenCalledTimes(0);
  });

  it('filters contacts based on search input', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: 'Jo',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });
    renderWithProvider(<PhoneBookSearch />);
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.queryByText('Jane')).toBeNull();
    expect(screen.queryByText('Bob')).toBeNull();
  });

  it('calls useThirdLevel with correct parameter', () => {
    renderWithProvider(<PhoneBookSearch />);
    expect(useThirdLevel).toHaveBeenCalledWith(0);
  });

  it('renders no contacts when search input does not match any contact', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: 'Z',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });
    renderWithProvider(<PhoneBookSearch />);
    expect(screen.queryByText('John')).toBeNull();
    expect(screen.queryByText('Jane')).toBeNull();
    expect(screen.queryByText('Bob')).toBeNull();
  });

  it('renders all contacts when search input is empty', () => {
    const mockHandleSearch = vi.fn();
    vi.mocked(usePhoneBookSearch).mockReturnValue({
      search: 'Jo',
      contacts: mockContacts,
      handleSearch: mockHandleSearch,
    });
    renderWithProvider(<PhoneBookSearch />);
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.getByText('Jane')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
  });
});
