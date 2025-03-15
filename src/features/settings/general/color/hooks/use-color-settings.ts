import { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import { setColor } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';

export const useColorSettings = () => {
  const dispatch = useDispatch();
  const [appColor, setAppColor] = useState<string>('');

  const { setFourthLevel } = useContext(GlobalContext);

  useEffect(() => {
    setFourthLevel(1);
  }, [setFourthLevel]);

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
