import { useTranslation } from 'react-i18next';
import S from './styled';
import { useLanguageSettings } from './hooks/use-language-settings';

const LanguageSettings = () => {
  const { t } = useTranslation();
  const { language, setAppLanguage, save, LANGUAGES } = useLanguageSettings();

  return (
    <>
      <S.MainContainer>
        {LANGUAGES.map((x) => (
          <S.ResultsBox key={x.iso639} onClick={() => setAppLanguage(x.iso639)}>
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
