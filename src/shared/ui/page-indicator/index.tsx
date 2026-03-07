import { useMemo } from 'react';

interface PageIndicatorProps {
  firstLevel: number;
  secondLevel: number;
  thirdLevel: number;
  fourthLevel: number;
  fifthLevel: number;
}

const buildPageIndicatorLabel = ({
  firstLevel,
  secondLevel,
  thirdLevel,
  fourthLevel,
  fifthLevel,
}: PageIndicatorProps) => {
  const firstLabel = firstLevel === 0 ? '' : `${firstLevel}`;
  const secondLabel = secondLevel > 0 ? `-${secondLevel}` : '';
  const thirdLabel = thirdLevel === 0 ? '' : `-${thirdLevel}`;
  const fourthLabel = fourthLevel === 0 ? '' : `-${fourthLevel}`;
  const fifthLabel = fifthLevel === 0 ? '' : `-${fifthLevel}`;

  return `${firstLabel}${secondLabel}${thirdLabel}${fourthLabel}${fifthLabel}`;
};

const PageIndicator = ({
  firstLevel,
  secondLevel,
  thirdLevel,
  fourthLevel,
  fifthLevel,
}: PageIndicatorProps) => {
  const indicator = useMemo(() => {
    return buildPageIndicatorLabel({
      firstLevel,
      secondLevel,
      thirdLevel,
      fourthLevel,
      fifthLevel,
    });
  }, [firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel]);

  return <h6>{indicator}</h6>;
};

export default PageIndicator;
