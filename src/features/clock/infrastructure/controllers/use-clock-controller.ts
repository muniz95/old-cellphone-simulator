import { formatClockTime } from '@/features/clock/domain/use-cases';
import { useSecondLevelController } from '@/features/clock/infrastructure/controllers/use-second-level-controller';
import { useTimerController } from '@/features/clock/infrastructure/controllers/use-timer-controller';

export const useClockController = () => {
  const date = useTimerController();
  useSecondLevelController();

  return {
    timeLabel: formatClockTime(date),
  };
};
