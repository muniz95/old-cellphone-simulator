import { useCallback, useEffect, useRef, useState } from 'react';

const DIMMED_BACKLIGHT_LEVEL = 10;

export const useInactivityBacklight = (
  backlightLevel: number,
  inactivityTimeInSeconds: number
) => {
  const [effectiveBacklightLevel, setEffectiveBacklightLevel] =
    useState(backlightLevel);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const scheduleDim = useCallback(() => {
    clearInactivityTimer();

    if (inactivityTimeInSeconds <= 0) {
      return;
    }

    inactivityTimerRef.current = setTimeout(() => {
      setEffectiveBacklightLevel(DIMMED_BACKLIGHT_LEVEL);
    }, inactivityTimeInSeconds * 1000);
  }, [clearInactivityTimer, inactivityTimeInSeconds]);

  const handleTouchActivity = useCallback(() => {
    setEffectiveBacklightLevel(backlightLevel);
    scheduleDim();
  }, [backlightLevel, scheduleDim]);

  useEffect(() => {
    setEffectiveBacklightLevel(backlightLevel);

    if (inactivityTimeInSeconds <= 0) {
      clearInactivityTimer();
      return;
    }

    scheduleDim();
  }, [
    backlightLevel,
    clearInactivityTimer,
    inactivityTimeInSeconds,
    scheduleDim,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('touchstart', handleTouchActivity, {
      passive: true,
    });
    window.addEventListener('touchmove', handleTouchActivity, {
      passive: true,
    });
    window.addEventListener('touchend', handleTouchActivity, {
      passive: true,
    });

    return () => {
      window.removeEventListener('touchstart', handleTouchActivity);
      window.removeEventListener('touchmove', handleTouchActivity);
      window.removeEventListener('touchend', handleTouchActivity);
      clearInactivityTimer();
    };
  }, [clearInactivityTimer, handleTouchActivity]);

  return effectiveBacklightLevel;
};

export { DIMMED_BACKLIGHT_LEVEL };
