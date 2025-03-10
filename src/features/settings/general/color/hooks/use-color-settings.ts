import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setFourthLevel } from '@/redux/actions';
import { setColor } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';

export const useColorSettings = () => {
  const dispatch = useDispatch();
  const [appColor, setAppColor] = useState<string>('');

  useEffect(() => {
    dispatch(setFourthLevel(1));
  }, [dispatch]);

  const handleColorClick = useCallback((color: string) => {
    setAppColor(color);
  }, []);

  const save = useCallback(() => {
    settingsService.setColor(appColor);
    dispatch(setColor(appColor));
    vibration.success();
    dispatch(openModal());
  }, [appColor, dispatch]);

  return {
    appColor,
    handleColorClick,
    save,
    setAppColor,
  };
};
