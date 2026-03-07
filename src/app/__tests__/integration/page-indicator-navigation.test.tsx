import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/app/app';
import '@/app/providers/i18n';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import {
  resetSettingsStore,
  SETTINGS_STORAGE_KEY,
} from '@/features/settings/state/settings-store';

const labels = {
  phoneBook: /Phone Book|Agenda|phonebookTitle/i,
  messages: /Messages|Mensagens|messagesTitle/i,
  chat: /Chat|Conversas|chatTitle/i,
  callRegister: /Call Register|Registro de chamadas|callregisterTitle/i,
  tones: /Tones|Toques|tonesTitle/i,
  settings: /Settings|Configurações|settingsTitle/i,
  callSettings: /Call Settings|Configurações de Chamada|callTitle/i,
  generalSettings: /General Settings|Configurações Gerais|general\.title/i,
  colorSettings: /Color Settings|Configurações de Cor|general\.color\.title/i,
  languageSettings:
    /Language Settings|Configurações de Idioma|general\.languageTitle/i,
};

const getIndicator = () => screen.getByRole('heading', { level: 6 });

const expectIndicator = (value: string) => {
  expect(getIndicator().textContent).toBe(value);
};

const expectNoFifthSegment = () => {
  const indicator = getIndicator().textContent ?? '';
  expect(indicator.split('-').length).toBeLessThanOrEqual(4);
  expect(useUiStore.getState().fifthLevel).toBe(0);
};

const tap = (element: Element) => {
  fireEvent.touchStart(element, {
    targetTouches: [{ clientX: 10, clientY: 10 }],
  });
  fireEvent.touchEnd(element);
};

const swipeLeft = (element: Element) => {
  fireEvent.touchStart(element, {
    targetTouches: [{ clientX: 120, clientY: 10 }],
  });
  fireEvent.touchMove(element, {
    targetTouches: [{ clientX: 20, clientY: 10 }],
  });
  fireEvent.touchEnd(element);
};

const pressBack = () => {
  fireEvent.click(screen.getByText('<'));
};

const pressHome = () => {
  fireEvent.click(screen.getByText('O'));
};

const advancePastStartup = () => {
  act(() => {
    vi.advanceTimersByTime(3000);
  });
};

const renderApp = () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  advancePastStartup();
};

const navigateHomeToSettings = () => {
  swipeLeft(screen.getByText(labels.phoneBook));
  swipeLeft(screen.getByText(labels.messages));
  swipeLeft(screen.getByText(labels.chat));
  swipeLeft(screen.getByText(labels.callRegister));
  swipeLeft(screen.getByText(labels.tones));

  expect(screen.getByText(labels.settings)).toBeTruthy();
  expectIndicator('6');
  expectNoFifthSegment();
};

const navigateSettingsToGeneral = () => {
  tap(screen.getByText(labels.settings));

  swipeLeft(screen.getByText(labels.callSettings));
  expect(screen.getByText(labels.generalSettings)).toBeTruthy();
  expectIndicator('6-2');
  expectNoFifthSegment();
};

const navigateGeneralToLanguage = () => {
  tap(screen.getByText(labels.generalSettings));

  swipeLeft(screen.getByText(labels.colorSettings));
  expect(screen.getByText(labels.languageSettings)).toBeTruthy();
  expectIndicator('6-2-2');
  expectNoFifthSegment();
};

const navigateToLanguagePage = () => {
  navigateHomeToSettings();
  navigateSettingsToGeneral();
  navigateGeneralToLanguage();
  tap(screen.getByText(labels.languageSettings));
};

describe('page indicator navigation integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    const storage = globalThis.localStorage as Partial<Storage>;
    if (typeof storage?.removeItem === 'function') {
      storage.removeItem(SETTINGS_STORAGE_KEY);
    }

    resetSettingsStore();
    resetUiStore();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('composes indicator while drilling down from level 1 to level 4', () => {
    renderApp();

    expectIndicator('1');
    expectNoFifthSegment();

    navigateHomeToSettings();
    navigateSettingsToGeneral();
    navigateGeneralToLanguage();

    tap(screen.getByText(labels.languageSettings));
    expectIndicator('6-2-2-2');
    expectNoFifthSegment();
  });

  it('hides fourth level after going back from a fourth-level page', () => {
    renderApp();
    navigateToLanguagePage();

    expectIndicator('6-2-2-2');
    expectNoFifthSegment();

    pressBack();
    expectIndicator('6-2-2');
    expectNoFifthSegment();
  });

  it('hides third and fourth levels after going back two levels', () => {
    renderApp();
    navigateToLanguagePage();

    pressBack();
    pressBack();
    expectIndicator('6-2');
    expectNoFifthSegment();
  });

  it('hides second level after going back to first-level menu', () => {
    renderApp();
    navigateToLanguagePage();

    pressBack();
    pressBack();
    pressBack();
    expectIndicator('6');
    expectNoFifthSegment();
  });

  it('keeps fifth level hidden throughout the full flow', () => {
    renderApp();

    expectNoFifthSegment();

    navigateHomeToSettings();
    navigateSettingsToGeneral();
    navigateGeneralToLanguage();
    tap(screen.getByText(labels.languageSettings));
    expectNoFifthSegment();

    pressBack();
    expectNoFifthSegment();

    pressBack();
    expectNoFifthSegment();

    pressBack();
    expectNoFifthSegment();
  });

  it('resets first-level indicator when navigating home from deeper levels', () => {
    renderApp();

    navigateHomeToSettings();
    expectIndicator('6');

    pressHome();

    expectIndicator('1');
    expect(useUiStore.getState().firstLevel).toBe(1);
    expect(useUiStore.getState().secondLevel).toBe(0);
    expect(useUiStore.getState().thirdLevel).toBe(0);
    expect(useUiStore.getState().fourthLevel).toBe(0);
    expect(useUiStore.getState().fifthLevel).toBe(0);
  });
});
