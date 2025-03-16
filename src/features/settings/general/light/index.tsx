import useTranslation from '@/hooks/use-translation';
import S from './styled';
import { useLightSettings } from './hooks/use-light-settings';

const LightSettings = () => {
  const { t } = useTranslation(['settings']);
  const {
    backlightLevel,
    setAppBacklightLevel,
    inactivityTime,
    setAppInactivityTime,
    save,
  } = useLightSettings();

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
            onChange={({ target }) =>
              setAppBacklightLevel(target.valueAsNumber)
            }
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
            onChange={({ target }) =>
              setAppInactivityTime(target.valueAsNumber)
            }
          />
        </S.ControllerSection>
      </S.MainContainer>
      <S.ButtonContainer>
        <button onClick={save}>{t('save', { ns: 'global' })}</button>
      </S.ButtonContainer>
    </>
  );
};

export default LightSettings;
