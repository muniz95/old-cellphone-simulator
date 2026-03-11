import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createRingtonePlayer,
  RingtonePlayer,
} from '@/shared/lib/ringtone-player';

const useRingtone = () => {
  const playerRef = useRef<RingtonePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mountedRef = useRef(true);

  if (!playerRef.current) {
    playerRef.current = createRingtonePlayer({
      onPlaybackStateChange: (playing) => {
        if (!mountedRef.current) return;
        setIsPlaying(playing);
      },
    });
  }

  useEffect(() => {
    return () => {
      mountedRef.current = false;
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

  return { play, stop, isPlaying };
};

export default useRingtone;
