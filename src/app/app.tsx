import { useRoutes } from 'react-router-dom';
import BatteryStatus from '@/shared/ui/battery-status';
import BottomBar from '@/shared/ui/bottom-bar';
import Modal from '@/shared/ui/modal';
import SignalStatus from '@/shared/ui/signal-status';
import TopBar from '@/shared/ui/top-bar';

import routes from '@/app/routes';
import Startup from '@/shared/ui/startup';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import GlobalStyle from '@/shared/styles/global-style';
import S from '@/app/ui/app-shell';

const App = () => {
  const routing = useRoutes([...routes]);

  const backlightLevel = useSettingsStore((state) => state.backlightLevel);
  const color = useSettingsStore((state) => state.color);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <S.AppShell backgroundColor={color} backlightLevel={backlightLevel}>
      <GlobalStyle />
      {firstRender ? (
        <Startup />
      ) : (
        <>
          <SignalStatus />
          <S.AppMainContainer>
            <TopBar />
            <S.AppPageContainer>{routing}</S.AppPageContainer>
            <BottomBar />
          </S.AppMainContainer>
          <BatteryStatus />
          <Modal />
        </>
      )}
    </S.AppShell>
  );
};

export default App;
