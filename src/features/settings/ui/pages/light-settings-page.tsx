import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import useTranslation from '@/shared/hooks/use-translation';
import { useLightSettingsController } from '@/features/settings/infrastructure/controllers/use-light-settings-controller';
import L from '../styles/light-settings-page.styled';

const formatInactivityTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
};

const LightSettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const {
    backlightLevel,
    setBacklightLevel,
    inactivityTime,
    setInactivityTime,
    save,
  } = useLightSettingsController();

  return (
    <>
      <S.MainContainer>
        <L.Controls data-testid="light-controls">
          <S.ControllerSection>
            <L.Header>
              <label htmlFor="backlight">
                {t('general.light.backlightLevel')}
              </label>
              <L.Value htmlFor="backlight" aria-live="polite">
                {backlightLevel}%
              </L.Value>
            </L.Header>
            <S.SliderInput
              step={10}
              min={20}
              max={100}
              id="backlight"
              value={backlightLevel}
              onChange={({ target }) => setBacklightLevel(target.valueAsNumber)}
            />
          </S.ControllerSection>
          <S.ControllerSection>
            <L.Header>
              <label htmlFor="inactivity">
                {t('general.light.inactiveAfter')}
              </label>
              <L.Value htmlFor="inactivity" aria-live="polite">
                {formatInactivityTime(inactivityTime)}
              </L.Value>
            </L.Header>
            <S.SliderInput
              step={30}
              min={30}
              max={300}
              id="inactivity"
              value={inactivityTime}
              onChange={({ target }) => setInactivityTime(target.valueAsNumber)}
            />
          </S.ControllerSection>
        </L.Controls>
      </S.MainContainer>
      <S.ButtonContainer>
        <UiButton onClick={save}>{t('save', { ns: 'global' })}</UiButton>
      </S.ButtonContainer>
    </>
  );
};

export default LightSettingsPage;
