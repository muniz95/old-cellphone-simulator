import S from '@/components/base';
import useTranslation from '@/hooks/use-translation';
import { useLightSettingsController } from '@/features/settings/infrastructure/controllers/use-light-settings-controller';

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
        <S.ControllerSection>
          <label htmlFor="backlight">{t('general.light.backlightLevel')}</label>
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
          <label htmlFor="inactivity">{t('general.light.inactiveAfter')}</label>
          <S.SliderInput
            step={30}
            min={0}
            max={600}
            id="inactivity"
            value={inactivityTime}
            onChange={({ target }) => setInactivityTime(target.valueAsNumber)}
          />
        </S.ControllerSection>
      </S.MainContainer>
      <S.ButtonContainer>
        <button onClick={save}>{t('save', { ns: 'global' })}</button>
      </S.ButtonContainer>
    </>
  );
};

export default LightSettingsPage;
