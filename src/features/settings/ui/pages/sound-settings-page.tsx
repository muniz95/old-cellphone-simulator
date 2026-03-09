import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import useTranslation from '@/shared/hooks/use-translation';
import { useSoundSettingsController } from '@/features/settings/infrastructure/controllers/use-sound-settings-controller';

const SoundSettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const {
    notificationLevel,
    setNotificationLevel,
    alarmLevel,
    setAlarmLevel,
    ringLevel,
    setRingLevel,
    save,
  } = useSoundSettingsController();

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
              setNotificationLevel(target.valueAsNumber)
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
            onChange={({ target }) => setAlarmLevel(target.valueAsNumber)}
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
            onChange={({ target }) => setRingLevel(target.valueAsNumber)}
          />
        </S.ControllerSection>
      </S.MainContainer>
      <S.ButtonContainer>
        <UiButton onClick={save}>{t('save', { ns: 'global' })}</UiButton>
      </S.ButtonContainer>
    </>
  );
};

export default SoundSettingsPage;
