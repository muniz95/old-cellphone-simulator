import { useCallback, useEffect } from 'react';
import S from '@/shared/ui/base';
import { useServiceNumbers } from './hooks/use-service-numbers';
import { useUiStore } from '@/stores/ui-store';

const PhoneBookServiceNos = () => {
  const { contacts } = useServiceNumbers();
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );

  useEffect(() => {
    dispatchSetThirdLevel(0);
  }, [dispatchSetThirdLevel]);

  return (
    <S.MainContainer>
      <S.ResultsBox>
        {contacts.map((c) => (
          <div key={c.id}>{c.name}</div>
        ))}
      </S.ResultsBox>
    </S.MainContainer>
  );
};

export default PhoneBookServiceNos;
