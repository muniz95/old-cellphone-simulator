import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import ListItem from '@/shared/ui/list-item';
import useTranslation from '@/shared/hooks/use-translation';
import { useLanguageSettingsController } from '@/features/settings/infrastructure/controllers/use-language-settings-controller';

const LanguageSettingsPage = () => {
  const { t } = useTranslation();
  const { language, options, save, setLanguage } =
    useLanguageSettingsController();

  return (
    <>
      <S.MainContainer>
        {options.map((option) => (
          <S.ResultsBox key={option.iso639}>
            <ListItem onClick={() => setLanguage(option.iso639)}>
              {option.title}
            </ListItem>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <UiButton disabled={language === ''} onClick={save}>
          {t('save')}
        </UiButton>
      </S.ButtonContainer>
    </>
  );
};

export default LanguageSettingsPage;
