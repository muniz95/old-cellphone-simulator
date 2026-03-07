import { useSettingsStore } from '@/features/settings/state/settings-store';
import { ResourcesType } from '@/shared/config/locales';
import { useTranslation as useTranslationHook } from 'react-i18next';

const useTranslation = (section?: ResourcesType[]) => {
  const language = useSettingsStore((state) => state.language);
  return useTranslationHook(section, { lng: language });
};

export default useTranslation;
