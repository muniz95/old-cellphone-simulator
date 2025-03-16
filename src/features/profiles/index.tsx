import useTranslation from '@/hooks/use-translation';
import S from './styled';
import { useProfiles } from './hooks/use-profiles';

const Profiles = () => {
  const { t } = useTranslation(['profiles']);
  const { profiles, selectedProfile, setSelectedProfile, applyProfile } =
    useProfiles();

  return (
    <>
      <S.MainContainer>
        {profiles.map((x) => (
          <S.ResultsBox key={x.name} onClick={() => setSelectedProfile(x)}>
            <S.Item>{x.isFactoryProfile ? t(x.name) : x.name}</S.Item>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <button
          disabled={selectedProfile === null}
          onClick={() => applyProfile(selectedProfile!)}
        >
          {t('save', { ns: 'global' })}
        </button>
      </S.ButtonContainer>
    </>
  );
};

export default Profiles;
