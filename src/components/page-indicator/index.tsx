import { useMemo } from 'react';
import { useUiStore } from '@/stores/ui-store';

const PageIndicator = () => {
  const firstLevel = useUiStore((state) => state.firstLevel);
  const secondLevel = useUiStore((state) => state.secondLevel);
  const thirdLevel = useUiStore((state) => state.thirdLevel);
  const fourthLevel = useUiStore((state) => state.fourthLevel);
  const fifthLevel = useUiStore((state) => state.fifthLevel);

  const indicator = useMemo(() => {
    const firstLabel = firstLevel === 0 ? '' : `${firstLevel}`;
    const secondLabel = secondLevel > 0 ? `-${secondLevel}` : '';
    const thirdLabel = thirdLevel === 0 ? '' : `-${thirdLevel}`;
    const fourthLabel = fourthLevel === 0 ? '' : `-${fourthLevel}`;
    const fifthLabel = fifthLevel === 0 ? '' : `-${fifthLevel}`;

    return `${firstLabel}${secondLabel}${thirdLabel}${fourthLabel}${fifthLabel}`;
  }, [firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel]);

  return <h6>{indicator}</h6>;
};

export default PageIndicator;
