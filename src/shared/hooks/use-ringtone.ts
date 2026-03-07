import { useCallback, useEffect, useRef } from 'react';
import {
  createRingtonePlayer,
  RingtonePlayer,
} from '@/shared/lib/ringtone-player';

const useRingtone = () => {
  const playerRef = useRef<RingtonePlayer | null>(null);

  if (!playerRef.current) {
    playerRef.current = createRingtonePlayer();
  }

  useEffect(() => {
    return () => {
      if (!playerRef.current) return;
      playerRef.current.dispose();
      playerRef.current = null;
    };
  }, []);

  const play = useCallback((notes: string, bpm: number) => {
    playerRef.current?.play(notes, bpm);
  }, []);

  const stop = useCallback(() => {
    playerRef.current?.stop();
  }, []);

  return { play, stop };
};

export default useRingtone;
