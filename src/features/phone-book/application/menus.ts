import { PhoneBookMenuItem } from '@/features/phone-book/domain/types';

export const buildPhoneBookMenu = (
  t: (key: string, options?: { ns?: string }) => string
): PhoneBookMenuItem[] => {
  return [
    { path: '/phonebook/search', title: t('searchTitle') },
    { path: '/phonebook/servicenos', title: t('servicenosTitle') },
    { path: '/phonebook/addname', title: t('addnameTitle') },
    { path: '/phonebook/erase', title: t('eraseTitle') },
    { path: '/phonebook/edit', title: t('editTitle') },
    { path: '/phonebook/assigntone', title: t('assigntoneTitle') },
    { path: '/phonebook/sendbcard', title: t('sendbcardTitle') },
    { path: '/phonebook/options', title: t('optionsTitle') },
    { path: '/phonebook/speeddials', title: t('speeddialsTitle') },
    { path: '/phonebook/voicetags', title: t('voicetagsTitle') },
  ];
};
