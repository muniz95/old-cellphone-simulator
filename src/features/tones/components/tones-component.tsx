import { Tone } from '@/interfaces/tone';
import useRingtone from '../hooks/use-ringtone';

interface TonesComponentProps {
  title: string;
  tones: Tone[];
}

export const TonesComponent: React.FC<TonesComponentProps> = ({ tones }) => {
  const { play } = useRingtone();
  return (
    <div className="home">
      {tones.map((x) => (
        <button onClick={() => play(x.composition, x.bpm)}>{x.name}</button>
      ))}
    </div>
  );
};
