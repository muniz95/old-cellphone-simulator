import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import routes from '@/app/routes';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/app/state/ui-store';

export const getPathDepth = (pathname: string) =>
  pathname.split('/').filter((segment) => segment.length > 0).length;

export const useApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routing = useRoutes([...routes]);

  const backlightLevel = useSettingsStore((state) => state.backlightLevel);
  const color = useSettingsStore((state) => state.color);
  const showModal = useUiStore((state) => state.showModal);
  const closeModal = useUiStore((state) => state.closeModal);
  const firstLevel = useUiStore((state) => state.firstLevel);
  const secondLevel = useUiStore((state) => state.secondLevel);
  const thirdLevel = useUiStore((state) => state.thirdLevel);
  const fourthLevel = useUiStore((state) => state.fourthLevel);
  const fifthLevel = useUiStore((state) => state.fifthLevel);
  const [firstRender, setFirstRender] = useState(true);

  const pathDepth = getPathDepth(location.pathname);

  const handleModalAutoClose = useCallback(() => {
    closeModal();
    navigate('/');
  }, [closeModal, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    backlightLevel,
    color,
    routePath: location.pathname,
    showModal,
    firstRender,
    handleModalAutoClose,
    routing,
    indicatorLevels: {
      firstLevel,
      secondLevel: pathDepth >= 1 ? secondLevel : 0,
      thirdLevel: pathDepth >= 2 ? thirdLevel : 0,
      fourthLevel: pathDepth >= 3 ? fourthLevel : 0,
      fifthLevel: pathDepth >= 4 ? fifthLevel : 0,
    },
  };
};
