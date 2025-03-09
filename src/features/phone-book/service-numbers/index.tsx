import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setThirdLevel } from '../../../redux/actions';
import S from './styled';
import { useServiceNumbers } from './hooks/use-service-numbers';

const PhoneBookServiceNos = () => {
  const dispatch = useDispatch();
  const { contacts } = useServiceNumbers();

  const dispatchSetThirdLevel = useCallback(
    (position: number) => dispatch(setThirdLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.Home>
      <S.ResultsBox>
        {contacts.map((c) => (
          <div key={c.id}>{c.name}</div>
        ))}
      </S.ResultsBox>
    </S.Home>
  );
};

export default PhoneBookServiceNos;
