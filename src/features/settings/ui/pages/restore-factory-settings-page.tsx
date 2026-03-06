import useTranslation from '@/shared/hooks/use-translation';
import { useRestoreSettingsController } from '@/features/settings/infrastructure/controllers/use-restore-settings-controller';

const RestoreFactorySettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const { goBack, resetData } = useRestoreSettingsController();

  return (
    <div className="home">
      {t('restore.restoreFactorySettings')}
      <div>
        <button onClick={resetData}>{t('yes', { ns: 'global' })}</button>
        <button onClick={goBack}>{t('no', { ns: 'global' })}</button>
      </div>
    </div>
  );
};

export default RestoreFactorySettingsPage;
