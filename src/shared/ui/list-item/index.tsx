import { ReactNode } from 'react';
import S from './styled';

interface ListItemProps {
  children: ReactNode;
  onClick?: () => void;
  testId?: string;
}

const ListItem = ({
  children,
  onClick,
  testId = 'list-item',
}: ListItemProps) => {
  if (onClick) {
    return (
      <S.Interactive type="button" data-testid={testId} onClick={onClick}>
        {children}
      </S.Interactive>
    );
  }

  return <S.Static data-testid={testId}>{children}</S.Static>;
};

export default ListItem;
