import { ModuleMenuEntry } from '@/app/modules/feature-module';
import { featureModules } from '@/app/modules/registry';

export interface HomeMenuItem {
  path: string;
  title: string;
}

type TranslateFn = (key: string, options?: { ns?: string }) => string;

const homeMenuOrder = [
  '/phonebook',
  '/messages',
  '/chat',
  '/callregister',
  '/tones',
  '/settings',
  '/calldivert',
  '/games',
  '/calculator',
  '/reminders',
  '/clock',
  '/profiles',
  '/simservices',
];

const orderedMenuSet = new Set(homeMenuOrder);

const legacyMenuEntries: ModuleMenuEntry[] = [
  { path: '/messages', titleKey: 'messagesTitle' },
  { path: '/chat', titleKey: 'chatTitle' },
  { path: '/callregister', titleKey: 'callregisterTitle' },
  { path: '/calldivert', titleKey: 'calldivertTitle' },
  { path: '/games', titleKey: 'gamesTitle' },
  { path: '/reminders', titleKey: 'remindersTitle' },
];

const getFeatureMenuEntries = (): ModuleMenuEntry[] =>
  featureModules.flatMap(
    (featureModule) => featureModule.registerMenuEntry?.() ?? []
  );

export const buildHomeMenu = (t: TranslateFn): HomeMenuItem[] => {
  const entriesByPath = new Map<string, ModuleMenuEntry>();

  [...legacyMenuEntries, ...getFeatureMenuEntries()].forEach((entry) => {
    entriesByPath.set(entry.path, entry);
  });

  const orderedEntries = homeMenuOrder
    .map((path) => entriesByPath.get(path))
    .filter((entry): entry is ModuleMenuEntry => entry !== undefined);

  const additionalEntries = [...entriesByPath.values()].filter(
    (entry) => !orderedMenuSet.has(entry.path)
  );

  return [...orderedEntries, ...additionalEntries].map((entry) => ({
    path: entry.path,
    title: t(
      entry.titleKey,
      entry.namespace ? { ns: entry.namespace } : undefined
    ),
  }));
};
