import { useCallback, useEffect, useMemo, useState } from 'react';
import { saveLanguageSelection } from '@/features/settings/application/actions';
import { LANGUAGE_OPTIONS } from '@/features/settings/domain/constants';
import { useFeedbackPort } from '@/features/settings/infrastructure/adapters/use-feedback-port';
import { usePageIndicatorPort } from '@/features/settings/infrastructure/adapters/use-page-indicator-port';
import { useSettingsStorePort } from '@/features/settings/infrastructure/adapters/use-settings-store-port';

export const useLanguageSettingsController = () => {
  const store = useSettingsStorePort();
  const feedback = useFeedbackPort();
  const { setFourth } = usePageIndicatorPort();
  const [language, setLanguage] = useState(store.read().language);

  useEffect(() => {
    setFourth(1);
  }, [setFourth]);

  const save = useCallback(() => {
    if (!language) return;
    saveLanguageSelection(store, feedback, language);
  }, [feedback, language, store]);

  const options = useMemo(() => LANGUAGE_OPTIONS, []);

  return {
    language,
    setLanguage,
    options,
    save,
  };
};
