import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setAlarmLevel,
  setNotificationLevel,
  setRingLevel,
} from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { openModal } from '@/redux/actions';

const useSoundSettings = () => {
  const dispatch = useDispatch();
  const [notificationLevel, setAppNotificationLevel] = useState(0);
  const [alarmLevel, setAppAlarmLevel] = useState(0);
  const [ringLevel, setAppRingLevel] = useState(0);

  const save = useCallback(() => {
    settingsService.setNotificationLevel(notificationLevel);
    settingsService.setAlarmLevel(alarmLevel);
    settingsService.setRingLevel(ringLevel);
    dispatch(setNotificationLevel(notificationLevel));
    dispatch(setAlarmLevel(alarmLevel));
    dispatch(setRingLevel(ringLevel));
    vibration.success();
    dispatch(openModal());
  }, [dispatch, notificationLevel, alarmLevel, ringLevel]);

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
