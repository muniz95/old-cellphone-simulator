import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setFourthLevel } from '@/redux/actions';
import { setLanguage } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';

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

  useEffect(() => {
    dispatch(setFourthLevel(3));
  }, [dispatch]);

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
