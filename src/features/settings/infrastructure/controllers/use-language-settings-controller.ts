import { useCallback, useEffect, useMemo, useState } from 'react';
import { LANGUAGE_OPTIONS } from '@/features/settings/domain/constants';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/stores/ui-store';
import vibration from '@/shared/lib/vibration';

export const useLanguageSettingsController = () => {
  const currentLanguage = useSettingsStore((state) => state.language);
  const saveLanguage = useSettingsStore((state) => state.setLanguage);
  const setFourthLevel = useUiStore((state) => state.setFourthLevel);
  const openModal = useUiStore((state) => state.openModal);
  const [language, setLanguage] = useState(currentLanguage);

  useEffect(() => {
    setFourthLevel(2);
  }, [setFourthLevel]);

  const save = useCallback(() => {
    if (!language) return;
    saveLanguage(language);
    vibration.success();
    openModal();
  }, [language, openModal, saveLanguage]);

  const options = useMemo(() => LANGUAGE_OPTIONS, []);

  return {
    language,
    setLanguage,
    options,
    save,
  };
};
