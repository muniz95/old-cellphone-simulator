import { Tone } from '@/entities/tone/model/tone';

interface TonesListProps {
  tones: Tone[];
  onPlayTone: (tone: Tone) => void;
}

const TonesList = ({ tones, onPlayTone }: TonesListProps) => {
  return (
    <div className="home">
      {tones.map((tone) => (
        <button key={tone.name} onClick={() => onPlayTone(tone)}>
          {tone.name}
        </button>
      ))}
    </div>
  );
};

export default TonesList;
