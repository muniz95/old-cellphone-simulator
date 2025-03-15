import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import { setLanguage } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';

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
  const dispatch = useDispatch();
  const [language, setAppLanguage] = useState('');

  const { setFourthLevel } = useContext(GlobalContext);

  useEffect(() => {
    setFourthLevel(3);
  }, []);

  const save = () => {
    settingsService.setLanguage(language);
    dispatch(setLanguage(language));
    vibration.success();
    dispatch(openModal());
  };

  return {
    language,
    setAppLanguage,
    save,
    LANGUAGES,
  };
};
