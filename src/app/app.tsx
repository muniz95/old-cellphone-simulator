import { Suspense } from 'react';
import BatteryStatus from '@/shared/ui/battery-status';
import BottomBar from '@/shared/ui/bottom-bar';
import Modal from '@/shared/ui/modal';
import PwaBanner from '@/shared/ui/pwa-banner';
import SignalStatus from '@/shared/ui/signal-status';
import TopBar from '@/shared/ui/top-bar';
import PageIndicator from '@/shared/ui/page-indicator';
import RouteLoading from '@/shared/ui/route-loading';
import Startup from '@/shared/ui/startup';
import GlobalStyle from '@/shared/styles/global-style';
import S from '@/app/ui/app-shell';
import { useApp } from '@/app/hooks/use-app';

const App = () => {
  const {
    backlightLevel,
    color,
    showModal,
    firstRender,
    handleModalAutoClose,
    routing,
    indicatorLevels,
  } = useApp();

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
                  firstLevel={indicatorLevels.firstLevel}
                  secondLevel={indicatorLevels.secondLevel}
                  thirdLevel={indicatorLevels.thirdLevel}
                  fourthLevel={indicatorLevels.fourthLevel}
                  fifthLevel={indicatorLevels.fifthLevel}
                />
              }
            />
            <PwaBanner />
            <S.AppPageContainer>
              <Suspense fallback={<RouteLoading />}>{routing}</Suspense>
            </S.AppPageContainer>
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
