import useTranslation from '@/hooks/use-translation';
import S from '@/components/base';
import { useColorSettings } from './hooks/use-color-settings';

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
  const { appColor, handleColorClick, save } = useColorSettings();

  return (
    <>
      <S.MainContainer>
        {COLORS.map((color) => (
          <S.Item key={color.rgb} onClick={() => handleColorClick(color.rgb)}>
            {t(color.title)}
          </S.Item>
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
