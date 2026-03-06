import { useContext } from 'react';
import vibration from '@/utils/vibration';
import { FeedbackPort } from '@/features/settings/application/ports';
import { GlobalContext } from '@/context/global/context';

export const useFeedbackPort = (): FeedbackPort => {
  const { openModal } = useContext(GlobalContext);

  return {
    success: () => {
      vibration.success();
      openModal();
    },
    reset: () => {
      vibration.reset();
      openModal();
    },
  };
};
