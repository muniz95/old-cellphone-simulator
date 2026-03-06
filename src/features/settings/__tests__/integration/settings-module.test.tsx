import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ReactNode, SetStateAction } from 'react';
import '@/i18n';
import { GlobalContext, defaultContext } from '@/context/global/context';
import { SettingsContext, settingsContext } from '@/context/settings/context';
import { settingsModule } from '@/features/settings/module';
import SettingsPage from '@/features/settings/ui/pages/settings-page';
import GeneralSettingsPage from '@/features/settings/ui/pages/general-settings-page';
import ColorSettingsPage from '@/features/settings/ui/pages/color-settings-page';
import LanguageSettingsPage from '@/features/settings/ui/pages/language-settings-page';
import LightSettingsPage from '@/features/settings/ui/pages/light-settings-page';
import SoundSettingsPage from '@/features/settings/ui/pages/sound-settings-page';
import RestoreFactorySettingsPage from '@/features/settings/ui/pages/restore-factory-settings-page';
import { DEFAULT_SETTINGS } from '@/features/settings/domain/constants';

const renderWithSettingsProviders = (ui: ReactNode) => {
  return render(
    <GlobalContext.Provider value={{ ...defaultContext }}>
      <SettingsContext.Provider value={{ ...settingsContext }}>
        {ui}
      </SettingsContext.Provider>
    </GlobalContext.Provider>
  );
};

describe('settings module integration', () => {
  it('exposes all expected routes', () => {
    const routePaths = settingsModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual([
      '/settings',
      '/settings/general',
      '/settings/general/color',
      '/settings/general/language',
      '/settings/general/light',
      '/settings/general/sound',
      '/settings/restore',
    ]);
  });

  it('navigates from settings menu on tap', () => {
    const { getByText } = renderWithSettingsProviders(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/call" element={<div>CALL</div>} />
        </Routes>
      </MemoryRouter>
    );

    const label = getByText(/Call Settings|callTitle/i);
    fireEvent.touchStart(label, {
      targetTouches: [{ clientX: 10, clientY: 10 }],
    });
    fireEvent.touchEnd(label);

    expect(getByText('CALL')).toBeTruthy();
  });

  it('navigates from general settings menu on tap', () => {
    const { getByText } = renderWithSettingsProviders(
      <MemoryRouter initialEntries={['/settings/general']}>
        <Routes>
          <Route path="/settings/general" element={<GeneralSettingsPage />} />
          <Route path="/settings/general/color" element={<div>COLOR</div>} />
        </Routes>
      </MemoryRouter>
    );

    const label = getByText(/Color Settings|general\.color\.title/i);
    fireEvent.touchStart(label, {
      targetTouches: [{ clientX: 10, clientY: 10 }],
    });
    fireEvent.touchEnd(label);

    expect(getByText('COLOR')).toBeTruthy();
  });

  it('saves updated values in pages using context-backed store', () => {
    let currentSettings = { ...DEFAULT_SETTINGS };

    const settingsValue = {
      ...settingsContext,
      get color() {
        return currentSettings.color;
      },
      setColor: (value: SetStateAction<string>) => {
        currentSettings.color =
          typeof value === 'function' ? value(currentSettings.color) : value;
      },
      get language() {
        return currentSettings.language;
      },
      setLanguage: (value: SetStateAction<string>) => {
        currentSettings.language =
          typeof value === 'function'
            ? value(currentSettings.language)
            : value;
      },
      get notificationLevel() {
        return currentSettings.notificationLevel;
      },
      setNotificationLevel: (value: SetStateAction<number>) => {
        currentSettings.notificationLevel =
          typeof value === 'function'
            ? value(currentSettings.notificationLevel)
            : value;
      },
      get alarmLevel() {
        return currentSettings.alarmLevel;
      },
      setAlarmLevel: (value: SetStateAction<number>) => {
        currentSettings.alarmLevel =
          typeof value === 'function' ? value(currentSettings.alarmLevel) : value;
      },
      get ringLevel() {
        return currentSettings.ringLevel;
      },
      setRingLevel: (value: SetStateAction<number>) => {
        currentSettings.ringLevel =
          typeof value === 'function' ? value(currentSettings.ringLevel) : value;
      },
      get backlightLevel() {
        return currentSettings.backlightLevel;
      },
      setBacklightLevel: (value: SetStateAction<number>) => {
        currentSettings.backlightLevel =
          typeof value === 'function'
            ? value(currentSettings.backlightLevel)
            : value;
      },
      get inactivityTime() {
        return currentSettings.inactivityTime;
      },
      setInactivityTime: (value: SetStateAction<number>) => {
        currentSettings.inactivityTime =
          typeof value === 'function'
            ? value(currentSettings.inactivityTime)
            : value;
      },
    };

    const { getAllByText, getByText, getByLabelText, unmount } = render(
      <MemoryRouter initialEntries={['/settings/restore']}>
        <GlobalContext.Provider value={{ ...defaultContext }}>
          <SettingsContext.Provider value={settingsValue}>
            <ColorSettingsPage />
            <LanguageSettingsPage />
            <LightSettingsPage />
            <SoundSettingsPage />
            <RestoreFactorySettingsPage />
          </SettingsContext.Provider>
        </GlobalContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(getByText(/Blue|general\.color\.blue/i));
    fireEvent.click(getAllByText(/Save|save|Salvar/i)[0]);
    expect(currentSettings.color).toBe('#0d48eb');

    fireEvent.click(getByText('Português'));
    fireEvent.click(getAllByText(/Save|save|Salvar/i)[1]);
    expect(currentSettings.language).toBe('pt');

    fireEvent.change(
      getByLabelText(
        /Backlight level|general\.light\.backlightLevel|Nível de luz de fundo/i
      ),
      {
        target: { value: '20', valueAsNumber: 20 },
      }
    );
    fireEvent.change(
      getByLabelText(
        /Inactive after|general\.light\.inactiveAfter|Inativo após/i
      ),
      {
        target: { value: '600', valueAsNumber: 600 },
      }
    );
    fireEvent.click(getAllByText(/Save|save|Salvar/i)[2]);
    expect(currentSettings.backlightLevel).toBe(20);
    expect(currentSettings.inactivityTime).toBe(600);

    fireEvent.change(
      getByLabelText(
        /Notification|general\.sound\.notification|Notificação/i
      ),
      {
        target: { value: '30', valueAsNumber: 30 },
      }
    );
    fireEvent.change(getByLabelText(/Alarm|general\.sound\.alarm|Alarme/i), {
      target: { value: '40', valueAsNumber: 40 },
    });
    fireEvent.change(getByLabelText(/Ring|general\.sound\.ring|Toque/i), {
      target: { value: '50', valueAsNumber: 50 },
    });
    fireEvent.click(getAllByText(/Save|save|Salvar/i)[3]);
    expect(currentSettings.notificationLevel).toBe(30);
    expect(currentSettings.alarmLevel).toBe(40);
    expect(currentSettings.ringLevel).toBe(50);

    fireEvent.click(getByText(/Yes|yes/i));
    expect(currentSettings).toEqual(DEFAULT_SETTINGS);

    unmount();
  });
});
