import { useClockController } from '@/features/clock/infrastructure/controllers/use-clock-controller';
import HomeScreen from '@/shared/ui/home-screen';

const ClockPage = () => {
  const { timeLabel } = useClockController();

  return (
    <HomeScreen>
      <h1 id="time">{timeLabel}</h1>
    </HomeScreen>
  );
};

export default ClockPage;
