import useTranslation from '@/shared/hooks/use-translation';
import { useRestoreSettingsController } from '@/features/settings/infrastructure/controllers/use-restore-settings-controller';
import HomeScreen from '@/shared/ui/home-screen';

const RestoreFactorySettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const { goBack, resetData } = useRestoreSettingsController();

  return (
    <HomeScreen>
      {t('restore.restoreFactorySettings')}
      <div>
        <button onClick={resetData}>{t('yes', { ns: 'global' })}</button>
        <button onClick={goBack}>{t('no', { ns: 'global' })}</button>
      </div>
    </HomeScreen>
  );
};

export default RestoreFactorySettingsPage;
