import { Tone } from '@/features/tones/domain/tone';
import { UiButton } from '@/shared/ui/controls';
import HomeScreen from '@/shared/ui/home-screen';

interface TonesListProps {
  tones: Tone[];
  onPlayTone: (tone: Tone) => void;
}

const TonesList = ({ tones, onPlayTone }: TonesListProps) => {
  return (
    <HomeScreen>
      {tones.map((tone) => (
        <UiButton key={tone.name} onClick={() => onPlayTone(tone)}>
          {tone.name}
        </UiButton>
      ))}
    </HomeScreen>
  );
};

export default TonesList;
