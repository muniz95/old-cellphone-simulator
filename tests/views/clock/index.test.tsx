import Clock from '../../../src/views/Clock';
import { renderWithProvider } from '../../utils';

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<Clock />);
    expect(container).toBeTruthy();
  });
});