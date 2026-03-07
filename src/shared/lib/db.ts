import defaults from '@/shared/config/defaults';
import seed from './seed';

export const ensureInitialData = () => {
  if (!localStorage.getItem('contacts')) {
    localStorage.setItem('contacts', JSON.stringify(seed.contacts));
  }
  if (!localStorage.getItem('simNumbers')) {
    localStorage.setItem('simNumbers', JSON.stringify(seed.simNumbers));
  }
  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(seed.profiles));
  }
  if (!localStorage.getItem('color')) {
    localStorage.setItem('color', defaults.settings.color);
  }
  if (!localStorage.getItem('currentProfile')) {
    localStorage.setItem(
      'currentProfile',
      JSON.stringify(defaults.profiles.currentProfile)
    );
  }
  if (!localStorage.getItem('callRecords')) {
    localStorage.setItem('callRecords', '[]');
  }
  if (!localStorage.getItem('tones')) {
    localStorage.setItem('tones', JSON.stringify(defaults.tones));
  }
};
