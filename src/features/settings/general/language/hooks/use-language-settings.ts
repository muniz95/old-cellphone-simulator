import { useEffect, useContext } from 'react';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import { SettingsContext } from '@/context/settings/context';

const LANGUAGES = [
  { title: 'Deustch', iso639: 'de' },
  { title: 'English', iso639: 'en' },
  { title: 'Español', iso639: 'es' },
  { title: 'Esperanto', iso639: 'eo' },
  { title: 'Français', iso639: 'fr' },
  { title: 'Italiano', iso639: 'it' },
  { title: 'Polski', iso639: 'pl' },
  { title: 'Português', iso639: 'pt' },
  { title: 'русский', iso639: 'ru' },
];

export const useLanguageSettings = () => {
  const { language, setLanguage } = useContext(SettingsContext);
  const { setFourthLevel, openModal } = useContext(GlobalContext);

  useEffect(() => {
    setFourthLevel(3);
  }, [setFourthLevel]);

  const save = () => {
    setLanguage(language);
    vibration.success();
    openModal();
  };

  return {
    language,
    setLanguage,
    save,
    LANGUAGES,
  };
};
