import React from "react";

interface IProps {
  children: React.ReactElement | React.ReactElement[]
  interval: number
}

const Blink = ({ children, interval }: IProps) => {
  const currentTimer = React.useRef<NodeJS.Timeout>();
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (interval > 0) {
      currentTimer.current = setInterval(() => {
        setIsVisible(state => !state);
      }, interval);
    } else {
      clearInterval(currentTimer.current);
      setIsVisible(true);
    }
  }, [interval]);

  return (
    <div style={{visibility: isVisible ? 'visible' : 'hidden'}}>
      { children }
    </div>
  );
}

export default Blink;
