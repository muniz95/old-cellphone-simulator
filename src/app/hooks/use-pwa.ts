import { useSyncExternalStore } from 'react';
import {
  applyPwaUpdate,
  getPwaState,
  installPwa,
  subscribePwa,
} from '@/app/lib/pwa';

export const usePwa = () => {
  const state = useSyncExternalStore(subscribePwa, getPwaState, getPwaState);

  return {
    ...state,
    install: installPwa,
    applyUpdate: applyPwaUpdate,
  };
};
