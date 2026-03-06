import { useCallback, useEffect, useMemo, useState } from 'react';
import { saveColorSelection } from '@/features/settings/application/actions';
import { COLOR_OPTIONS } from '@/features/settings/domain/constants';
import { useFeedbackPort } from '@/features/settings/infrastructure/adapters/use-feedback-port';
import { usePageIndicatorPort } from '@/features/settings/infrastructure/adapters/use-page-indicator-port';
import { useSettingsStorePort } from '@/features/settings/infrastructure/adapters/use-settings-store-port';

export const useColorSettingsController = () => {
  const [color, setColor] = useState('');
  const feedback = useFeedbackPort();
  const store = useSettingsStorePort();
  const { setFourth } = usePageIndicatorPort();

  useEffect(() => {
    setFourth(0);
  }, [setFourth]);

  const save = useCallback(() => {
    if (!color) return;
    saveColorSelection(store, feedback, color);
  }, [color, feedback, store]);

  const options = useMemo(() => COLOR_OPTIONS, []);

  return {
    color,
    setColor,
    save,
    options,
  };
};
