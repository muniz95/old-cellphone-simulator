import { ReactElement, useEffect, useRef, useState } from 'react';
import S from './styled';

interface IProps {
  children: ReactElement | ReactElement[];
  interval: number;
}

const Blink = ({ children, interval }: IProps) => {
  const currentTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (interval > 0) {
      currentTimer.current = setInterval(() => {
        setIsVisible((state) => !state);
      }, interval);
    } else {
      if (currentTimer.current) {
        clearInterval(currentTimer.current);
      }
      setIsVisible(true);
    }

    return () => {
      if (currentTimer.current) {
        clearInterval(currentTimer.current);
      }
    };
  }, [interval]);

  return <S.BlinkContainer isVisible={isVisible}>{children}</S.BlinkContainer>;
};

export default Blink;
