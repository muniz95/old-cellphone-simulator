import { generateId } from "../helpers";

const profiles = [
  {
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
  },
  {
    id: generateId(),
    isFactoryProfile: true,
    ringtone: 'default',
    ringLevel: 0,
    notificationTone: 'default',
    notificationLevel: 0,
    alarmTone: 'default',
    soundEffectsLevel: 0,
    soundEffectsEnabled: true,
    vibrationEnabled: true,
    blinkingLightsEnabled: true,
    name: "silent"
  },
  {
    id: generateId(),
    isFactoryProfile: true,
    ringtone: 'default',
    ringLevel: 25,
    notificationTone: 'default',
    notificationLevel: 25,
    alarmTone: 'default',
    soundEffectsLevel: 25,
    soundEffectsEnabled: true,
    vibrationEnabled: true,
    blinkingLightsEnabled: true,
    name: "discrete"
  },
  {
    id: generateId(),
    isFactoryProfile: true,
    ringtone: 'default',
    ringLevel: 100,
    notificationTone: 'default',
    notificationLevel: 100,
    alarmTone: 'default',
    soundEffectsLevel: 100,
    soundEffectsEnabled: true,
    vibrationEnabled: true,
    blinkingLightsEnabled: true,
    name: "loud"
  }
]

export default profiles;
