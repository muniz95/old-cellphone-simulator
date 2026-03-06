import { useCallback, useContext, useMemo } from 'react';
import { GlobalContext } from '@/context/global/context';
import { PageIndicatorPort } from '@/features/settings/application/ports';

export const usePageIndicatorPort = (): PageIndicatorPort => {
  const { setSecondLevel, setThirdLevel, setFourthLevel } =
    useContext(GlobalContext);

  const setSecond = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );
  const setThird = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );
  const setFourth = useCallback(
    (position: number) => setFourthLevel(position + 1),
    [setFourthLevel]
  );

  return useMemo(
    () => ({
      setSecond,
      setThird,
      setFourth,
    }),
    [setFourth, setSecond, setThird]
  );
};
