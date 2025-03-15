import { useState, useEffect, useContext } from 'react';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import { SettingsContext } from '@/context/settings/context';

export const useLightSettings = () => {
  const { setFourthLevel, openModal } = useContext(GlobalContext);
  const { setBacklightLevel, setInactivityTime } = useContext(SettingsContext);
  const [backlightLevel, setAppBacklightLevel] = useState(0);
  const [inactivityTime, setAppInactivityTime] = useState(0);

  useEffect(() => {
    setFourthLevel(3);
  }, [setFourthLevel]);

  const save = () => {
    settingsService.setBacklightLevel(backlightLevel);
    settingsService.setInactivityTime(inactivityTime);
    setBacklightLevel(backlightLevel);
    setInactivityTime(inactivityTime);
    vibration.success();
    openModal();
  };

  return {
    backlightLevel,
    setAppBacklightLevel,
    inactivityTime,
    setAppInactivityTime,
    save,
  };
};
