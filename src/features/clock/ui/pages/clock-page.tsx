import { useClockController } from '@/features/clock/infrastructure/controllers/use-clock-controller';

const ClockPage = () => {
  const { timeLabel } = useClockController();

  return (
    <div className="home">
      <h1 id="time">{timeLabel}</h1>
    </div>
  );
};

export default ClockPage;
