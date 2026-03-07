import CurrentPageContainer from '@/shared/ui/current-page-container';

interface SwipeMenuProps {
  label: string;
  onTap: () => void;
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

const SwipeMenu = ({
  label,
  onTap,
  onSwipedLeft,
  onSwipedRight,
}: SwipeMenuProps) => {
  return (
    <CurrentPageContainer
      onTap={onTap}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
    >
      {label}
    </CurrentPageContainer>
  );
};

export default SwipeMenu;
