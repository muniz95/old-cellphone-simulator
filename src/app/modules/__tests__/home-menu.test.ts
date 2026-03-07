import { describe, expect, it, vi } from 'vitest';
import { buildHomeMenu } from '@/app/modules/home-menu';

describe('buildHomeMenu', () => {
  it('keeps home menu order stable', () => {
    const t = (key: string) => key;

    const menus = buildHomeMenu(t);

    expect(menus.map((menu) => menu.path)).toEqual([
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
    ]);
  });

  it('translates all menu entries and passes namespace when provided', () => {
    const t = vi.fn((key: string) => key);

    const menus = buildHomeMenu(t);

    expect(t).toHaveBeenCalledTimes(menus.length);
    expect(t).toHaveBeenCalledWith('settingsTitle', { ns: 'home' });
    expect(t).toHaveBeenCalledWith('messagesTitle', undefined);
  });
});
