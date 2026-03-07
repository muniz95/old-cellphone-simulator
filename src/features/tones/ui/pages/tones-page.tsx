import { useTonesController } from '@/features/tones/infrastructure/controllers/use-tones-controller';
import TonesList from '@/features/tones/ui/components/tones-list';

const TonesPage = () => {
  const { tones, playTone } = useTonesController();

  return <TonesList tones={tones} onPlayTone={playTone} />;
};

export default TonesPage;
