import SwipeMenu from '@/features/settings/ui/components/swipe-menu';
import { useSettingsMenuController } from '@/features/settings/infrastructure/controllers/use-settings-menu-controller';

const SettingsPage = () => {
  const { currentLabel, onTap, onSwipedLeft, onSwipedRight } =
    useSettingsMenuController();

  return (
    <SwipeMenu
      label={currentLabel}
      onTap={onTap}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
    />
  );
};

export default SettingsPage;
