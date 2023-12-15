import { generateId } from "utils/helpers";

export const color = '#c0b400';
export const backlightLevel = 80;
export const profile = {
  id: generateId(),
  isFactoryProfile: true,
  ringtone: 'default',
  ringLevel: 50,
  notificationTone: 'default',
  notificationLevel: 50,
  alarmTone: 'default',
  soundEffectsLevel: 50,
  soundEffectsEnabled: true,
  vibrationEnabled: true,
  blinkingLightsEnabled: true,
  name: "normal"
}

const constants = {
  color,
  backlightLevel,
  profile,
};

export default constants;
