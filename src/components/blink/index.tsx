import { ReactElement, useEffect, useRef, useState } from 'react';

interface IProps {
  children: ReactElement | ReactElement[];
  interval: number;
}

const Blink = ({ children, interval }: IProps) => {
  const currentTimer = useRef<NodeJS.Timeout>();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (interval > 0) {
      currentTimer.current = setInterval(() => {
        setIsVisible((state) => !state);
      }, interval);
    } else {
      clearInterval(currentTimer.current);
      setIsVisible(true);
    }
  }, [interval]);

  return (
    <div style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
};

export default Blink;
