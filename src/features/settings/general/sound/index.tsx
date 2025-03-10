import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFourthLevel } from '@/redux/actions';
import S from './styled';
import useSoundSettings from './hooks/use-sound-settings';
import { useTranslation } from 'react-i18next';

const SoundSettings = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch();
  const {
    notificationLevel,
    setAppNotificationLevel,
    alarmLevel,
    setAppAlarmLevel,
    ringLevel,
    setAppRingLevel,
    save,
  } = useSoundSettings();

  useEffect(() => {
    dispatch(setFourthLevel(3));
  }, [dispatch]);

  return (
    <>
      <S.MainContainer>
        <S.ControllerSection>
          <label htmlFor="notification">
            {t('general.sound.notification')}
          </label>
          <S.SliderInput
            step={10}
            min={0}
            max={100}
            id="notification"
            value={notificationLevel}
            onChange={({ target }) =>
              setAppNotificationLevel(Number(target.value))
            }
          />
        </S.ControllerSection>
        <S.ControllerSection>
          <label htmlFor="alarm">{t('general.sound.alarm')}</label>
          <S.SliderInput
            step={10}
            min={0}
            max={100}
            id="alarm"
            value={alarmLevel}
            onChange={({ target }) => setAppAlarmLevel(Number(target.value))}
          />
        </S.ControllerSection>
        <S.ControllerSection>
          <label htmlFor="ring">{t('general.sound.ring')}</label>
          <S.SliderInput
            step={10}
            min={0}
            max={100}
            id="ring"
            value={ringLevel}
            onChange={({ target }) => setAppRingLevel(Number(target.value))}
          />
        </S.ControllerSection>
      </S.MainContainer>
      <S.ButtonContainer>
        <button onClick={save}>{t('save', { ns: 'global' })}</button>
      </S.ButtonContainer>
    </>
  );
};

export default SoundSettings;
