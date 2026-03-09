import useTranslation from '@/shared/hooks/use-translation';
import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import { useProfilesController } from '@/features/profiles/infrastructure/controllers/use-profiles-controller';

const ProfilesPage = () => {
  const { t } = useTranslation(['profiles']);
  const { profiles, selectedProfile, setSelectedProfile, applyProfile } =
    useProfilesController();

  return (
    <>
      <S.MainContainer>
        {profiles.map((profile) => (
          <S.ResultsBox
            key={profile.name}
            onClick={() => setSelectedProfile(profile)}
          >
            <S.Item>
              {profile.isFactoryProfile ? t(profile.name) : profile.name}
            </S.Item>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <UiButton
          disabled={selectedProfile === null}
          onClick={() => applyProfile(selectedProfile!)}
        >
          {t('save', { ns: 'global' })}
        </UiButton>
      </S.ButtonContainer>
    </>
  );
};

export default ProfilesPage;
