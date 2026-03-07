import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import BatteryStatus from '@/shared/ui/battery-status';
import BottomBar from '@/shared/ui/bottom-bar';
import Modal from '@/shared/ui/modal';
import SignalStatus from '@/shared/ui/signal-status';
import TopBar from '@/shared/ui/top-bar';
import PageIndicator from '@/shared/ui/page-indicator';

import routes from '@/app/routes';
import Startup from '@/shared/ui/startup';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import GlobalStyle from '@/shared/styles/global-style';
import S from '@/app/ui/app-shell';
import { useUiStore } from '@/app/state/ui-store';

const App = () => {
  const navigate = useNavigate();
  const routing = useRoutes([...routes]);

  const backlightLevel = useSettingsStore((state) => state.backlightLevel);
  const color = useSettingsStore((state) => state.color);
  const showModal = useUiStore((state) => state.showModal);
  const closeModal = useUiStore((state) => state.closeModal);
  const firstLevel = useUiStore((state) => state.firstLevel);
  const secondLevel = useUiStore((state) => state.secondLevel);
  const thirdLevel = useUiStore((state) => state.thirdLevel);
  const fourthLevel = useUiStore((state) => state.fourthLevel);
  const fifthLevel = useUiStore((state) => state.fifthLevel);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleModalAutoClose = useCallback(() => {
    closeModal();
    navigate('/');
  }, [closeModal, navigate]);

  return (
    <S.AppShell backgroundColor={color} backlightLevel={backlightLevel}>
      <GlobalStyle />
      {firstRender ? (
        <Startup color={color} />
      ) : (
        <>
          <SignalStatus />
          <S.AppMainContainer>
            <TopBar
              pageIndicator={
                <PageIndicator
                  firstLevel={firstLevel}
                  secondLevel={secondLevel}
                  thirdLevel={thirdLevel}
                  fourthLevel={fourthLevel}
                  fifthLevel={fifthLevel}
                />
              }
            />
            <S.AppPageContainer>{routing}</S.AppPageContainer>
            <BottomBar />
          </S.AppMainContainer>
          <BatteryStatus />
          <Modal
            color={color}
            isOpen={showModal}
            onAutoClose={handleModalAutoClose}
          />
        </>
      )}
    </S.AppShell>
  );
};

export default App;
