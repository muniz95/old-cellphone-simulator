import { useCallback, useContext } from 'react';
import vibration from '@/utils/vibration';
import { useNavigate } from 'react-router';
import useTranslation from '@/hooks/use-translation';
import { GlobalContext } from '@/context/global/context';

const RestoreFactorySettings = () => {
  const { t } = useTranslation(['settings']);
  const { openModal } = useContext(GlobalContext);
  const navigate = useNavigate();
  const dispatchOpenModal = useCallback(() => openModal(), [openModal]);
  const resetData = () => {
    // TODO: implement a resetData function
    // service.resetData();
    vibration.reset();
    dispatchOpenModal();
  };

  return (
    <div className="home">
      {t('restore.restoreFactorySettings')}
      <div>
        <button onClick={resetData}>{t('yes', { ns: 'global' })}</button>
        <button onClick={() => navigate(-1)}>
          {t('no', { ns: 'global' })}
        </button>
      </div>
    </div>
  );
};

export default RestoreFactorySettings;
