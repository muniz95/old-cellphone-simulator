import { useCallback, useContext } from 'react';
import vibration from '@/utils/vibration';
import { SettingsContext } from '@/context/settings/context';
import { GlobalContext } from '@/context/global/context';

const useSoundSettings = () => {
  const { openModal } = useContext(GlobalContext);
  const {
    alarmLevel,
    notificationLevel,
    ringLevel,
    setNotificationLevel,
    setAlarmLevel,
    setRingLevel,
  } = useContext(SettingsContext);

  const save = useCallback(() => {
    setNotificationLevel(notificationLevel);
    setAlarmLevel(alarmLevel);
    setRingLevel(ringLevel);
    vibration.success();
    openModal();
  }, [
    notificationLevel,
    alarmLevel,
    ringLevel,
    setNotificationLevel,
    setAlarmLevel,
    setRingLevel,
    openModal,
  ]);

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

export default useSoundSettings;
