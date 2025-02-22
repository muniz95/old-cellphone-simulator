import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import service from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const RestoreFactorySettings = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchOpenModal = useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  const resetData = () => {
    service.resetData();
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
