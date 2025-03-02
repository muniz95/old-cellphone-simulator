import BatteryStatus from '../../../src/components/BatteryStatus';
import { renderWithProvider } from '../../utils';

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<BatteryStatus />);
    expect(container).toBeTruthy();
  });
});