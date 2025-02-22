import { TouchEvent, useRef } from 'react';

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
  onTap?: () => void; // Optional tap handler
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

const useSwipe = (input: SwipeInput): SwipeOutput => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  const minSwipeDistance = 50;
  const maxTapDuration = 300;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndY.current = null;
    touchStartY.current = e.targetTouches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchStartY.current || !touchStartTime.current)
      return;

    const timeDiff = Date.now() - touchStartTime.current;
    if (
      (!touchEndX.current || !touchStartX.current) &&
      timeDiff <= maxTapDuration &&
      input.onTap
    ) {
      input.onTap();
      return;
    }
    const distanceX = touchStartX.current - touchEndX.current!;
    const distanceY = touchStartY.current - touchEndY.current!;

    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isRightSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      input.onSwipedRight();
    } else if (isLeftSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      input.onSwipedLeft();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useSwipe;
