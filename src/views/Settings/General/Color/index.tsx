import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setFourthLevel } from '@/redux/actions';
import { setColor } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import S from './styled';
import vibration from '@/utils/vibration';
import { useTranslation } from 'react-i18next';

const ColorSettings = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch();

  const COLORS = [
    { title: t('general.color.default'), rgb: '#c0b400' },
    { title: t('general.color.blue'), rgb: '#0d48eb' },
    { title: t('general.color.gray'), rgb: '#c7c7c7' },
    { title: t('general.color.green'), rgb: '#46c000' },
    { title: t('general.color.orange'), rgb: '#f3a34c' },
    { title: t('general.color.purple'), rgb: '#f74bda' },
    { title: t('general.color.red'), rgb: '#f53737' },
    { title: t('general.color.teal'), rgb: '#3785eb' },
    { title: t('general.color.yellow'), rgb: '#f5e93e' },
  ];

  const [appColor, setAppColor] = useState('');

  useEffect(() => {
    dispatch(setFourthLevel(1));
  });

  const save = () => {
    settingsService.setColor(appColor);
    dispatch(setColor(appColor));
    vibration.success();
    dispatch(openModal());
  };

  return (
    <>
      <S.MainContainer>
        {COLORS.map((x) => (
          <S.ResultsBox onClick={() => setAppColor(x.rgb)}>
            <S.Item>{x.title}</S.Item>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={appColor === ''} onClick={save}>
          {t('save', { ns: 'global' })}
        </button>
      </S.ButtonContainer>
    </>
  );
};

export default ColorSettings;
