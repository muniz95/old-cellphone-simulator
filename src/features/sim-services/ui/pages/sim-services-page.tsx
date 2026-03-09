import useTranslation from '@/shared/hooks/use-translation';
import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import ListItem from '@/shared/ui/list-item';
import { useSimServicesController } from '@/features/sim-services/infrastructure/controllers/use-sim-services-controller';

const SimServicesPage = () => {
  const { t } = useTranslation(['simservices']);
  const { simNumbers, setCurrentSimNumber, canPlay, play } =
    useSimServicesController();

  return (
    <>
      <S.MainContainer>
        {simNumbers.map((service) => (
          <S.ResultsBox key={service.id}>
            <ListItem onClick={() => setCurrentSimNumber(service)}>
              {service.name}
            </ListItem>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <UiButton disabled={!canPlay} onClick={play}>
          {t('play', { ns: 'global' })}
        </UiButton>
      </S.ButtonContainer>
    </>
  );
};

export default SimServicesPage;
