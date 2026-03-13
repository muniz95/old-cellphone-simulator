import { ReactNode } from 'react';
import S from './styled';

interface ListItemProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  testId?: string;
}

const ListItem = ({
  children,
  disabled = false,
  onClick,
  testId = 'list-item',
}: ListItemProps) => {
  if (onClick) {
    return (
      <S.Interactive
        type="button"
        data-testid={testId}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </S.Interactive>
    );
  }

  return <S.Static data-testid={testId}>{children}</S.Static>;
};

export default ListItem;
