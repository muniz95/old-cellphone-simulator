import { useRef, useState } from 'react';
import useTranslation from '@/hooks/use-translation';
import service from '@/services/call.service';
import S from './styled';
import { formatTime } from '@/utils/helpers';

interface IProps {
  type: 'outgoing' | 'received';
  contactName: string;
  phone: string;
}

const VoiceCall = ({ contactName, type, phone }: IProps) => {
  const { t } = useTranslation();
  const currentTimer = useRef<NodeJS.Timeout>();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callTime, setCallTime] = useState<number>(0);
  const [callStartDate, setCallStartDate] = useState<number>(0);

  const startCall = () => {
    setIsConnecting(true);
    setIsCallActive(true);
    setTimeout(() => {
      currentTimer.current = setInterval(() => {
        setCallTime((state) => (state += 1));
      }, 1000);
      setCallStartDate(Date.now());
      setIsConnecting(false);
    }, 3000);
  };

  const endCall = () => {
    clearInterval(currentTimer.current);
    setIsCallActive(false);
    service.insertCallRecord({
      contactName,
      startDate: callStartDate,
      endDate: Date.now(),
      phone,
      type,
    });
  };

  return (
    <>
      <S.MainContainer>
        {isCallActive
          ? isConnecting
            ? `Calling ${contactName}...`
            : formatTime(callTime)
          : formatTime(callTime)}
      </S.MainContainer>
      <S.ButtonContainer>
        {isCallActive ? (
          <button onClick={() => endCall()}>{t('end')}</button>
        ) : (
          <button onClick={() => startCall()}>{t('start')}</button>
        )}
      </S.ButtonContainer>
    </>
  );
};

export default VoiceCall;
