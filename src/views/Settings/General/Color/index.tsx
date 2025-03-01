import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setFourthLevel } from '@/redux/actions';
import { setColor } from '@/redux/actions/settings';
import settingsService from '@/services/setting.service';
import S from './styled';
import vibration from '@/utils/vibration';
import { useTranslation } from 'react-i18next';

interface ColorOption {
  title: string;
  rgb: string;
}

const COLORS: ColorOption[] = [
  { title: 'general.color.default', rgb: '#c0b400' },
  { title: 'general.color.blue', rgb: '#0d48eb' },
  { title: 'general.color.gray', rgb: '#c7c7c7' },
  { title: 'general.color.green', rgb: '#46c000' },
  { title: 'general.color.orange', rgb: '#f3a34c' },
  { title: 'general.color.purple', rgb: '#f74bda' },
  { title: 'general.color.red', rgb: '#f53737' },
  { title: 'general.color.teal', rgb: '#3785eb' },
  { title: 'general.color.yellow', rgb: '#f5e93e' },
];

const ColorSettings: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch();
  const [appColor, setAppColor] = useState<string>('');

  useEffect(() => {
    dispatch(setFourthLevel(1));
  }, [dispatch]);

  const handleColorClick = useCallback((color: string) => {
    setAppColor(color);
  }, []);

  const save = useCallback(() => {
    settingsService.setColor(appColor);
    dispatch(setColor(appColor));
    vibration.success();
    dispatch(openModal());
  }, [appColor, dispatch]);

  return (
    <>
      <S.MainContainer>
        {COLORS.map((color) => (
          <S.ResultsBox
            key={color.rgb}
            onClick={() => handleColorClick(color.rgb)}
          >
            <S.Item>{t(color.title)}</S.Item>
          </S.ResultsBox>
        ))}
      </S.MainContainer>
      <S.ButtonContainer>
        <button
          disabled={appColor === ''}
          onClick={save}
          aria-label={t('save', { ns: 'global' })}
        >
          {t('save', { ns: 'global' })}
        </button>
      </S.ButtonContainer>
    </>
  );
};

export default ColorSettings;
