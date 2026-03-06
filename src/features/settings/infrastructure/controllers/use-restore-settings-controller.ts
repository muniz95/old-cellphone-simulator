import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import vibration from '@/utils/vibration';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/stores/ui-store';

export const useRestoreSettingsController = () => {
  const resetDefaults = useSettingsStore((state) => state.resetDefaults);
  const openModal = useUiStore((state) => state.openModal);
  const navigate = useNavigate();

  const resetData = useCallback(() => {
    resetDefaults();
    vibration.reset();
    openModal();
  }, [openModal, resetDefaults]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    resetData,
    goBack,
  };
};
