import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetSettingsToDefaults } from '@/features/settings/application/actions';
import { useFeedbackPort } from '@/features/settings/infrastructure/adapters/use-feedback-port';
import { useSettingsStorePort } from '@/features/settings/infrastructure/adapters/use-settings-store-port';

export const useRestoreSettingsController = () => {
  const store = useSettingsStorePort();
  const feedback = useFeedbackPort();
  const navigate = useNavigate();

  const resetData = useCallback(() => {
    resetSettingsToDefaults(store, feedback);
  }, [feedback, store]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    resetData,
    goBack,
  };
};
