import useTranslation from '@/hooks/use-translation';
import { useLanguageSettings } from './hooks/use-language-settings';
import S from '@/components/base';

const LanguageSettings = () => {
  const { t } = useTranslation();
  const { language, setLanguage, save, LANGUAGES } = useLanguageSettings();

  return (
    <>
      <S.MainContainer>
        {LANGUAGES.map((x) => (
          <S.ResultsBox key={x.iso639} onClick={() => setLanguage(x.iso639)}>
            <S.Item>{x.title}</S.Item>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={language === ''} onClick={save}>
          {t('save')}
        </button>
      </S.ButtonContainer>
    </>
  );
};

export default LanguageSettings;
