import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import { say } from '@/utils/sound';
import S from './styled';
import { SimNumber } from '@/interfaces/simNumber';
import service from '@/services/simNumber.service';

const SimServices = () => {
  const { t } = useTranslation(['simservices']);
  const [simNumbers, setSimNumbers] = useState<SimNumber[]>([]);
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber>();
  const dispatch = useDispatch();

  const play = () => {
    if (!currentSimNumber) return;
    say(currentSimNumber?.message);
  };

  useEffect(() => {
    dispatch(setSecondLevel(0));
    setSimNumbers(service.getSimNumbers());
  }, [dispatch]);
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
