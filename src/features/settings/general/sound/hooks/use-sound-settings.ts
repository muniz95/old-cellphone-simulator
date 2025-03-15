import { useState, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { openModal } from '@/redux/actions';
import { SettingsContext } from '@/context/settings/context';

const useSoundSettings = () => {
  const dispatch = useDispatch();
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
    dispatch(openModal());
  }, [
    notificationLevel,
    alarmLevel,
    ringLevel,
    setNotificationLevel,
    setAlarmLevel,
    setRingLevel,
    dispatch,
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
