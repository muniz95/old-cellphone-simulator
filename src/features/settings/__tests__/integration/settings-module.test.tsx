import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@/app/providers/i18n';
import { settingsModule } from '@/features/settings/module';
import SettingsPage from '@/features/settings/ui/pages/settings-page';
import GeneralSettingsPage from '@/features/settings/ui/pages/general-settings-page';
import ColorSettingsPage from '@/features/settings/ui/pages/color-settings-page';
import LanguageSettingsPage from '@/features/settings/ui/pages/language-settings-page';
import LightSettingsPage from '@/features/settings/ui/pages/light-settings-page';
import SoundSettingsPage from '@/features/settings/ui/pages/sound-settings-page';
import RestoreFactorySettingsPage from '@/features/settings/ui/pages/restore-factory-settings-page';
import {
  resetSettingsStore,
  SETTINGS_STORAGE_KEY,
  useSettingsStore,
} from '@/features/settings/state/settings-store';
import { resetUiStore } from '@/app/state/ui-store';
import { DEFAULT_SETTINGS } from '@/features/settings/domain/constants';

describe('settings module integration', () => {
  beforeEach(() => {
    const storage = globalThis.localStorage as Partial<Storage>;
    if (typeof storage?.removeItem === 'function') {
      storage.removeItem(SETTINGS_STORAGE_KEY);
    }
    resetSettingsStore();
    resetUiStore();
  });

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
    const { getByText } = render(
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
    const { getByText } = render(
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

  it('saves updated values through store-backed pages', () => {
    const { getAllByText, getByText, getByLabelText } = render(
      <MemoryRouter initialEntries={['/settings/restore']}>
        <ColorSettingsPage />
        <LanguageSettingsPage />
        <LightSettingsPage />
        <SoundSettingsPage />
        <RestoreFactorySettingsPage />
      </MemoryRouter>
    );

    fireEvent.click(getByText(/Blue|general\.color\.blue/i));
    fireEvent.click(getAllByText(/Save|save|Salvar/i)[0]);
    expect(useSettingsStore.getState().color).toBe('#0d48eb');

    fireEvent.click(getByText('Português'));
    fireEvent.click(getAllByText(/Save|save|Salvar/i)[1]);
    expect(useSettingsStore.getState().language).toBe('pt');

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
    expect(useSettingsStore.getState().backlightLevel).toBe(20);
    expect(useSettingsStore.getState().inactivityTime).toBe(600);

    fireEvent.change(
      getByLabelText(/Notification|general\.sound\.notification|Notificação/i),
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
    expect(useSettingsStore.getState().notificationLevel).toBe(30);
    expect(useSettingsStore.getState().alarmLevel).toBe(40);
    expect(useSettingsStore.getState().ringLevel).toBe(50);

    fireEvent.click(getByText(/Yes|yes|Sim/i));

    const settings = useSettingsStore.getState();
    expect(settings.color).toBe(DEFAULT_SETTINGS.color);
    expect(settings.language).toBe(DEFAULT_SETTINGS.language);
    expect(settings.notificationLevel).toBe(DEFAULT_SETTINGS.notificationLevel);
    expect(settings.alarmLevel).toBe(DEFAULT_SETTINGS.alarmLevel);
    expect(settings.ringLevel).toBe(DEFAULT_SETTINGS.ringLevel);
    expect(settings.backlightLevel).toBe(DEFAULT_SETTINGS.backlightLevel);
    expect(settings.inactivityTime).toBe(DEFAULT_SETTINGS.inactivityTime);
  });
});
