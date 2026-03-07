import { useCallback, useEffect, useState } from 'react';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/app/state/ui-store';
import vibration from '@/shared/lib/vibration';

export const useLightSettingsController = () => {
  const currentBacklightLevel = useSettingsStore(
    (state) => state.backlightLevel
  );
  const currentInactivityTime = useSettingsStore(
    (state) => state.inactivityTime
  );
  const setLightSettings = useSettingsStore((state) => state.setLightSettings);
  const setFourthLevel = useUiStore((state) => state.setFourthLevel);
  const openModal = useUiStore((state) => state.openModal);
  const [backlightLevel, setBacklightLevel] = useState(currentBacklightLevel);
  const [inactivityTime, setInactivityTime] = useState(currentInactivityTime);

  useEffect(() => {
    setFourthLevel(3);
  }, [setFourthLevel]);

  const save = useCallback(() => {
    setLightSettings({ backlightLevel, inactivityTime });
    vibration.success();
    openModal();
  }, [backlightLevel, inactivityTime, openModal, setLightSettings]);

  return {
    backlightLevel,
    setBacklightLevel,
    inactivityTime,
    setInactivityTime,
    save,
  };
};
