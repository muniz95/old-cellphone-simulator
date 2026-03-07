import S from '@/shared/ui/base';
import useTranslation from '@/shared/hooks/use-translation';
import { useColorSettingsController } from '@/features/settings/infrastructure/controllers/use-color-settings-controller';

const ColorSettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const { color, options, save, setColor } = useColorSettingsController();

  return (
    <>
      <S.MainContainer>
        {options.map((option) => (
          <S.Item key={option.rgb} onClick={() => setColor(option.rgb)}>
            {t(option.titleKey)}
          </S.Item>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={color === ''} onClick={save}>
          {t('save', { ns: 'global' })}
        </button>
      </S.ButtonContainer>
    </>
  );
};

export default ColorSettingsPage;
