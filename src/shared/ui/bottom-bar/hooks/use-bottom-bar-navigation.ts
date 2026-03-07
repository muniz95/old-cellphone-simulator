import { useNavigate } from 'react-router';
import { useUiStore } from '@/app/state/ui-store';

export const useBottomBarNavigation = () => {
  const navigate = useNavigate();
  const setFirstLevel = useUiStore((state) => state.setFirstLevel);
  const resetLevels = useUiStore((state) => state.resetLevels);
  const goBack = () => navigate(-1);
  const goHome = () => {
    setFirstLevel(1);
    resetLevels();
    navigate('/', { replace: true });
  };

  return {
    goBack,
    goHome,
  };
};
