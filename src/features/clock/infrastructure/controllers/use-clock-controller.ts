import { useEffect } from 'react';
import { useUiStore } from '@/app/state/ui-store';
import { formatClockTime } from '@/features/clock/domain/use-cases';
import { useTimerController } from '@/features/clock/infrastructure/controllers/use-timer-controller';

export const useClockController = () => {
  const date = useTimerController();
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(1);
  }, [setSecondLevel]);

  return {
    timeLabel: formatClockTime(date),
  };
};
