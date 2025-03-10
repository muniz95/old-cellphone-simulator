import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setFourthLevel } from '@/redux/actions';
import { setBacklightLevel, setInactivityTime } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';

export const useLightSettings = () => {
  const dispatch = useDispatch();
  const [backlightLevel, setAppBacklightLevel] = useState(0);
  const [inactivityTime, setAppInactivityTime] = useState(0);

  useEffect(() => {
    dispatch(setFourthLevel(3));
  }, [dispatch]);

  const save = () => {
    settingsService.setBacklightLevel(backlightLevel);
    settingsService.setInactivityTime(inactivityTime);
    dispatch(setBacklightLevel(backlightLevel));
    dispatch(setInactivityTime(inactivityTime));
    vibration.success();
    dispatch(openModal());
  };

  return {
    backlightLevel,
    setAppBacklightLevel,
    inactivityTime,
    setAppInactivityTime,
    save,
  };
};
