import { useCallback, useEffect, useState } from 'react';
import { SimNumber } from '@/features/sim-services/domain/sim-number';
import useSimNumbersData from '@/features/sim-services/infrastructure/hooks/use-sim-numbers-data';
import { say } from '@/shared/lib/sound';
import {
  getSelectedSimServiceMessage,
  hasSelectedSimService,
} from '@/features/sim-services/domain/use-cases';
import { useUiStore } from '@/app/state/ui-store';

export const useSimServicesController = () => {
  const simNumbers = useSimNumbersData();
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber | null>(
    null
  );
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(0);
  }, [setSecondLevel]);

  const play = useCallback(() => {
    const message = getSelectedSimServiceMessage(currentSimNumber);
    if (!message) return;
    say(message);
  }, [currentSimNumber]);

  return {
    simNumbers,
    currentSimNumber,
    setCurrentSimNumber,
    canPlay: hasSelectedSimService(currentSimNumber),
    play,
  };
};
