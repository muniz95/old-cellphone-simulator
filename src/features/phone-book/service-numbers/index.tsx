import { useCallback, useContext, useEffect } from 'react';
import S from './styled';
import { useServiceNumbers } from './hooks/use-service-numbers';
import { GlobalContext } from '@/context/global/context';

const PhoneBookServiceNos = () => {
  const { contacts } = useServiceNumbers();
  const { setThirdLevel } = useContext(GlobalContext);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
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
