import useTranslation from '@/shared/hooks/use-translation';
import { useRestoreSettingsController } from '@/features/settings/infrastructure/controllers/use-restore-settings-controller';
import { UiButton } from '@/shared/ui/controls';
import HomeScreen from '@/shared/ui/home-screen';

const RestoreFactorySettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const { goBack, resetData } = useRestoreSettingsController();

  return (
    <HomeScreen>
      {t('restore.restoreFactorySettings')}
      <div>
        <UiButton onClick={resetData}>{t('yes', { ns: 'global' })}</UiButton>
        <UiButton onClick={goBack}>{t('no', { ns: 'global' })}</UiButton>
      </div>
    </HomeScreen>
  );
};

export default RestoreFactorySettingsPage;
