import { useState, useEffect, useCallback, useContext } from 'react';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import { SettingsContext } from '@/context/settings/context';

export const useColorSettings = () => {
  const [appColor, setAppColor] = useState<string>('');

  const { setFourthLevel, openModal } = useContext(GlobalContext);
  const { setColor } = useContext(SettingsContext);

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
    openModal();
  }, [appColor, openModal, setColor]);

  return {
    appColor,
    handleColorClick,
    save,
    setAppColor,
  };
};
