import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '@/shared/config/locales';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
});
