import useTranslation from '@/hooks/use-translation';

const useMenuItems = () => {
  const { t } = useTranslation(['phonebook']);
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

export default useMenuItems;
