import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/use-translation';
import { buildGeneralSettingsMenu } from '@/features/settings/application/menus';
import { usePageIndicatorPort } from '@/features/settings/infrastructure/adapters/use-page-indicator-port';
import { useCircularMenuController } from '@/features/settings/infrastructure/controllers/use-circular-menu-controller';

export const useGeneralSettingsMenuController = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const { setThird } = usePageIndicatorPort();

  const menuItems = useMemo(() => buildGeneralSettingsMenu(t), [t]);

  return useCircularMenuController({
    menuItems,
    setLevel: setThird,
    goTo: navigate,
  });
};
