import { useContext, useEffect } from 'react';
import S from './styled';
import useSoundSettings from './hooks/use-sound-settings';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/context/global/context';

const SoundSettings = () => {
  const { t } = useTranslation(['settings']);

  const { setFourthLevel } = useContext(GlobalContext);
  const {
    notificationLevel,
    setNotificationLevel,
    alarmLevel,
    setAlarmLevel,
    ringLevel,
    setRingLevel,
    save,
  } = useSoundSettings();

  useEffect(() => {
    setFourthLevel(3);
  }, [setFourthLevel]);

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
              setNotificationLevel(Number(target.value))
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
            onChange={({ target }) => setAlarmLevel(Number(target.value))}
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
            onChange={({ target }) => setRingLevel(Number(target.value))}
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
