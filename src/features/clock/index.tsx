import useTimer from './hooks/use-timer';
import useSecondLevel from './hooks/use-second-level';

const Clock = () => {
  const date = useTimer();
  useSecondLevel();

  return (
    <div className="home">
      <h1 id="time">{`${date.toLocaleTimeString('pt-br')}`}</h1>
    </div>
  );
};

export default Clock;
