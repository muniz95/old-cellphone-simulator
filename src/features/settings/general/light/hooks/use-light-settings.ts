import { useEffect, useContext } from 'react';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import { SettingsContext } from '@/context/settings/context';

export const useLightSettings = () => {
  const { setFourthLevel, openModal } = useContext(GlobalContext);
  const {
    backlightLevel,
    inactivityTime,
    setBacklightLevel,
    setInactivityTime,
  } = useContext(SettingsContext);

  useEffect(() => {
    setFourthLevel(3);
  }, [setFourthLevel]);

  const save = () => {
    setBacklightLevel(backlightLevel);
    setInactivityTime(inactivityTime);
    vibration.success();
    openModal();
  };

  return {
    backlightLevel,
    setBacklightLevel,
    inactivityTime,
    setInactivityTime,
    save,
  };
};
