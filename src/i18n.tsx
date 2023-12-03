import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from 'locales/en/translation.json';
import portuguese from 'locales/pt/translation.json';

const resources = {
  en: { translation: english },
  pt: { translation: portuguese },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt'
});