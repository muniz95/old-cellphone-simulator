type PwaState = {
  canInstall: boolean;
  updateAvailable: boolean;
  offlineReady: boolean;
};

const defaultState: PwaState = {
  canInstall: false,
  updateAvailable: false,
  offlineReady: false,
};

let state: PwaState = { ...defaultState };
let initialized = false;
let refreshing = false;
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let waitingServiceWorker: ServiceWorkerLike | null = null;
const listeners = new Set<() => void>();

interface ServiceWorkerLike {
  postMessage: (message: { type: string }) => void;
}

const notify = () => {
  listeners.forEach((listener) => listener());
};

const setState = (partial: Partial<PwaState>) => {
  state = {
    ...state,
    ...partial,
  };
  notify();
};

const setWaitingServiceWorker = (worker: ServiceWorkerLike | null) => {
  waitingServiceWorker = worker;
  setState({ updateAvailable: worker !== null });
};

const onBeforeInstallPrompt = (event: Event) => {
  const promptEvent = event as BeforeInstallPromptEvent;

  promptEvent.preventDefault();
  deferredPrompt = promptEvent;
  setState({ canInstall: true });
};

const onAppInstalled = () => {
  deferredPrompt = null;
  setState({ canInstall: false });
};

const observeInstallingWorker = (
  registration: ServiceWorkerRegistration,
  worker: ServiceWorker
) => {
  worker.addEventListener('statechange', () => {
    if (worker.state !== 'installed') {
      return;
    }

    if (navigator.serviceWorker.controller) {
      setWaitingServiceWorker(registration.waiting ?? worker);
      return;
    }

    setState({ offlineReady: true });
  });
};

const observeRegistration = (registration: ServiceWorkerRegistration) => {
  if (registration.waiting) {
    setWaitingServiceWorker(registration.waiting);
  }

  registration.addEventListener('updatefound', () => {
    const worker = registration.installing;

    if (worker) {
      observeInstallingWorker(registration, worker);
    }
  });
};

const registerServiceWorker = async () => {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    observeRegistration(registration);

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) {
        return;
      }

      refreshing = true;
      window.location.reload();
    });
  } catch (error) {
    console.error('pwa: service worker registration failed', error);
  }
};

export const initPwa = () => {
  if (initialized || typeof window === 'undefined') {
    return;
  }

  initialized = true;
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.addEventListener('appinstalled', onAppInstalled);
  void registerServiceWorker();
};

export const subscribePwa = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getPwaState = () => state;

export const installPwa = async () => {
  if (!deferredPrompt) {
    return;
  }

  const promptEvent = deferredPrompt;

  deferredPrompt = null;
  setState({ canInstall: false });

  await promptEvent.prompt();
  await promptEvent.userChoice;
};

export const applyPwaUpdate = () => {
  if (!waitingServiceWorker) {
    return;
  }

  waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
  setWaitingServiceWorker(null);
};

export const resetPwaStateForTests = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.removeEventListener('appinstalled', onAppInstalled);
  }

  state = { ...defaultState };
  initialized = false;
  refreshing = false;
  deferredPrompt = null;
  waitingServiceWorker = null;
  listeners.clear();
};

export const setWaitingServiceWorkerForTests = (
  worker: ServiceWorkerLike | null
) => {
  setWaitingServiceWorker(worker);
};
