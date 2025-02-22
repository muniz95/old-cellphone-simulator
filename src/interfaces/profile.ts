import { StorageEntity } from './storageEntity';

export interface Profile extends StorageEntity {
  isFactoryProfile: boolean;
  ringtone: string;
  ringLevel: number;
  notificationTone: string;
  notificationLevel: number;
  alarmTone: string;
  soundEffectsLevel: number;
  soundEffectsEnabled: boolean;
  vibrationEnabled: boolean;
  blinkingLightsEnabled: boolean;
  name: string;
}
