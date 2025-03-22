import { generateId } from '@/utils/helpers';

const profiles = {
  profiles: [],
  currentProfile: {
    id: generateId().toString(),
    isFactoryProfile: true,
    ringtone: '',
    ringLevel: 50,
    notificationTone: '',
    notificationLevel: 50,
    alarmTone: '',
    soundEffectsLevel: 50,
    soundEffectsEnabled: true,
    vibrationEnabled: true,
    blinkingLightsEnabled: true,
    name: 'Default',
  },
};

export default profiles;
