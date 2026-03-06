import { useCallback, useEffect, useState } from 'react';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/stores/ui-store';
import vibration from '@/utils/vibration';

export const useSoundSettingsController = () => {
  const notification = useSettingsStore((state) => state.notificationLevel);
  const alarm = useSettingsStore((state) => state.alarmLevel);
  const ring = useSettingsStore((state) => state.ringLevel);
  const setSoundLevels = useSettingsStore((state) => state.setSoundLevels);
  const setFourthLevel = useUiStore((state) => state.setFourthLevel);
  const openModal = useUiStore((state) => state.openModal);

  const [notificationLevel, setNotificationLevel] = useState(notification);
  const [alarmLevel, setAlarmLevel] = useState(alarm);
  const [ringLevel, setRingLevel] = useState(ring);

  useEffect(() => {
    setFourthLevel(4);
  }, [setFourthLevel]);

  const save = useCallback(() => {
    setSoundLevels({
      notificationLevel,
      alarmLevel,
      ringLevel,
    });
    vibration.success();
    openModal();
  }, [alarmLevel, notificationLevel, openModal, ringLevel, setSoundLevels]);

  return {
    notificationLevel,
    setNotificationLevel,
    alarmLevel,
    setAlarmLevel,
    ringLevel,
    setRingLevel,
    save,
  };
};
