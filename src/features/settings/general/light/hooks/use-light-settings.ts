import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import { setInactivityTime } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';

export const useLightSettings = () => {
  const dispatch = useDispatch();
  const { setFourthLevel, setBacklightLevel } = useContext(GlobalContext);
  const [backlightLevel, setAppBacklightLevel] = useState(0);
  const [inactivityTime, setAppInactivityTime] = useState(0);

  useEffect(() => {
    setFourthLevel(3);
  }, [setFourthLevel]);

  const save = () => {
    settingsService.setBacklightLevel(backlightLevel);
    settingsService.setInactivityTime(inactivityTime);
    setBacklightLevel(backlightLevel);
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
