import SwipeMenu from '@/features/phone-book/ui/components/swipe-menu';
import { usePhoneBookMenuController } from '@/features/phone-book/infrastructure/controllers/use-phone-book-menu-controller';

const PhoneBookPage = () => {
  const { label, onTap, onSwipedLeft, onSwipedRight } =
    usePhoneBookMenuController();

  return (
    <SwipeMenu
      label={label}
      onTap={onTap}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
    />
  );
};

export default PhoneBookPage;
