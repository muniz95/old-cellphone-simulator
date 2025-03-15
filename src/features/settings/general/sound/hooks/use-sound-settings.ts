import { useState, useCallback, useContext } from 'react';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { SettingsContext } from '@/context/settings/context';
import { GlobalContext } from '@/context/global/context';

const useSoundSettings = () => {
  const { openModal } = useContext(GlobalContext);
  const { setNotificationLevel, setAlarmLevel, setRingLevel } =
    useContext(SettingsContext);
  const [notificationLevel, setAppNotificationLevel] = useState(0);
  const [alarmLevel, setAppAlarmLevel] = useState(0);
  const [ringLevel, setAppRingLevel] = useState(0);

  const save = useCallback(() => {
    settingsService.setNotificationLevel(notificationLevel);
    settingsService.setAlarmLevel(alarmLevel);
    settingsService.setRingLevel(ringLevel);
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
    setAppNotificationLevel,
    alarmLevel,
    setAppAlarmLevel,
    ringLevel,
    setAppRingLevel,
    save,
  };
};

export default useSoundSettings;
