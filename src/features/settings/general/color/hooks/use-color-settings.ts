import { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';

export const useColorSettings = () => {
  const dispatch = useDispatch();
  const [appColor, setAppColor] = useState<string>('');

  const { setFourthLevel, setColor } = useContext(GlobalContext);

  useEffect(() => {
    setFourthLevel(1);
  }, [setFourthLevel]);

  const handleColorClick = useCallback((color: string) => {
    setAppColor(color);
  }, []);

  const save = useCallback(() => {
    settingsService.setColor(appColor);
    setColor(appColor);
    vibration.success();
    dispatch(openModal());
  }, [appColor, dispatch, setColor]);

  return {
    appColor,
    handleColorClick,
    save,
    setAppColor,
  };
};
