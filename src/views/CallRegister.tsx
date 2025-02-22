import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '../redux/actions';
import { useTranslation } from 'react-i18next';

const CallRegister = () => {
  const { t } = useTranslation(['callregister']);
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);
  return <div className="home">{t('title')}</div>;
};

export default CallRegister;
