import defaults from '@/shared/config/defaults';
import seed from './seed';
import { initializeIndexedDbValues } from '@/shared/hooks/use-indexed-db';

export const ensureInitialData = async () =>
  initializeIndexedDbValues({
    contacts: seed.contacts,
    simNumbers: seed.simNumbers,
    profiles: seed.profiles,
    color: defaults.settings.color,
    currentProfile: defaults.profiles.currentProfile,
    callRecords: [],
    tones: defaults.tones,
  });
