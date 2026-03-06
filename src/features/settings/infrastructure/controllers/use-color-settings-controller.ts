import { useCallback, useEffect, useMemo, useState } from 'react';
import { COLOR_OPTIONS } from '@/features/settings/domain/constants';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/stores/ui-store';
import vibration from '@/shared/lib/vibration';

export const useColorSettingsController = () => {
  const [color, setColor] = useState('');
  const saveColor = useSettingsStore((state) => state.setColor);
  const setFourthLevel = useUiStore((state) => state.setFourthLevel);
  const openModal = useUiStore((state) => state.openModal);

  useEffect(() => {
    setFourthLevel(1);
  }, [setFourthLevel]);

  const save = useCallback(() => {
    if (!color) return;
    saveColor(color);
    vibration.success();
    openModal();
  }, [color, openModal, saveColor]);

  const options = useMemo(() => COLOR_OPTIONS, []);

  return {
    color,
    setColor,
    save,
    options,
  };
};
