import { SettingsContext } from '@/context/settings/context';
import { ResourcesType } from '@/locales';
import { useContext } from 'react';
import { useTranslation as useTranslationHook } from 'react-i18next';

const useTranslation = (section?: ResourcesType[]) => {
  const { language } = useContext(SettingsContext);
  return useTranslationHook(section, { lng: language });
};

export default useTranslation;
