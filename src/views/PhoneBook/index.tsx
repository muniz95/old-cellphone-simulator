import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setSecondLevel, setThirdLevel } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import CurrentPageContainer from '@/components/CurrentPageContainer';

const PhoneBook = () => {
  const { t } = useTranslation(['phonebook']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );
  const dispatchClearThirdLevel = useCallback(
    () => dispatch(setThirdLevel(0)),
    [dispatch]
  );
  const [menus] = useState([
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
  ]);
  const [position, setPosition] = useState(0);

  const handleTap = () => {
    navigate(menus[position].path);
  };

  const swipeLeft = () => {
    setPosition(position === menus.length - 1 ? 0 : position + 1);
  };

  const swipeRight = () => {
    setPosition(position === 0 ? menus.length - 1 : position - 1);
  };

  useEffect(() => {
    dispatchSetSecondLevel(position);
    dispatchClearThirdLevel();
  }, [dispatchSetSecondLevel, dispatchClearThirdLevel, position]);

  const label = menus[position];
  return (
    <CurrentPageContainer
      onTap={handleTap}
      onSwipedLeft={swipeLeft}
      onSwipedRight={swipeRight}
    >
      {label.title}
    </CurrentPageContainer>
  );
};

export default PhoneBook;
