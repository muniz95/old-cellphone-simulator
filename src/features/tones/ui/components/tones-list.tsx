import { Tone } from '@/features/tones/domain/tone';
import HomeScreen from '@/shared/ui/home-screen';

interface TonesListProps {
  tones: Tone[];
  onPlayTone: (tone: Tone) => void;
}

const TonesList = ({ tones, onPlayTone }: TonesListProps) => {
  return (
    <HomeScreen>
      {tones.map((tone) => (
        <button key={tone.name} onClick={() => onPlayTone(tone)}>
          {tone.name}
        </button>
      ))}
    </HomeScreen>
  );
};

export default TonesList;
