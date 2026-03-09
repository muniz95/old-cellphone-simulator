import useTranslation from '@/shared/hooks/use-translation';
import S from '@/shared/ui/base';
import { UiButton } from '@/shared/ui/controls';
import { useSimServicesController } from '@/features/sim-services/infrastructure/controllers/use-sim-services-controller';

const SimServicesPage = () => {
  const { t } = useTranslation(['simservices']);
  const { simNumbers, setCurrentSimNumber, canPlay, play } =
    useSimServicesController();

  return (
    <>
      <S.MainContainer>
        {simNumbers.map((service) => (
          <S.ResultsBox
            onClick={() => setCurrentSimNumber(service)}
            key={service.id}
          >
            <S.Item>{service.name}</S.Item>
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
