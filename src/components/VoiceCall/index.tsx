import React from "react";
import service from "services/call.service";

interface IProps {
  type: "outgoing" | "received"
  contactName: string;
}

const VoiceCall = ({ contactName, type }: IProps) => {
  const currentTimer = React.useRef<NodeJS.Timeout>();
  const [isCallActive, setIsCallActive] = React.useState(false);
  const [callTime, setCallTime] = React.useState<number>(0);
  const [callStartDate, setCallStartDate] = React.useState<number>(0);

  const startCall = () => {
    setIsCallActive(true);
    currentTimer.current = setInterval(() => {
      setCallTime(state => state += 1);
    }, 1000);
    setCallStartDate(Date.now());
  }

  const endCall = () => {
    clearInterval(currentTimer.current);
    setIsCallActive(false);
    service.insertCallRecord({
      contactName,
      startDate: callStartDate,
      endDate: Date.now(),
      number: "123",
      type
    });
  }

  return (
    <>
      {
        isCallActive
        ? <div>
            {callTime}
            <button onClick={() => endCall()}>End</button>
          </div>
        : <div>
            {callTime}
            <button onClick={() => startCall()}>Start</button>
          </div> }
    </>
  )
}

export default VoiceCall;
