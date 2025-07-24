import useTranslation from '@/hooks/use-translation';
import S from '@/components/base';
import useSimServices from './hooks/use-sim-services';

const SimServices = () => {
  const { t } = useTranslation(['simservices']);
  const { simNumbers, currentSimNumber, setCurrentSimNumber, play } =
    useSimServices();

  return (
    <>
      <S.MainContainer>
        {simNumbers.map((x) => (
          <S.ResultsBox onClick={() => setCurrentSimNumber(x)} key={x.id}>
            <S.Item>{x.name}</S.Item>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={currentSimNumber === null} onClick={play}>
          {t('play', { ns: 'global' })}
        </button>
      </S.ButtonContainer>
    </>
  );
};

export default SimServices;
