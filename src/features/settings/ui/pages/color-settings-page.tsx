import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import ListItem from '@/shared/ui/list-item';
import useTranslation from '@/shared/hooks/use-translation';
import { useColorSettingsController } from '@/features/settings/infrastructure/controllers/use-color-settings-controller';

const ColorSettingsPage = () => {
  const { t } = useTranslation(['settings']);
  const { color, options, save, setColor } = useColorSettingsController();

  return (
    <>
      <S.MainContainer>
        {options.map((option) => (
          <ListItem key={option.rgb} onClick={() => setColor(option.rgb)}>
            {t(option.titleKey)}
          </ListItem>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <UiButton disabled={color === ''} onClick={save}>
          {t('save', { ns: 'global' })}
        </UiButton>
      </S.ButtonContainer>
    </>
  );
};

export default ColorSettingsPage;
