import S from './styled';
import { usePwa } from '@/app/hooks/use-pwa';

const PwaBanner = () => {
  const { canInstall, updateAvailable, install, applyUpdate } = usePwa();

  if (!canInstall && !updateAvailable) {
    return null;
  }

  const onAction = () => {
    if (updateAvailable) {
      applyUpdate();
      return;
    }

    void install();
  };

  return (
    <S.Container role="status" aria-live="polite">
      <S.Message>
        {updateAvailable
          ? 'A new version is ready.'
          : 'Install app on home screen.'}
      </S.Message>
      <S.ActionButton type="button" onClick={onAction}>
        {updateAvailable ? 'Update' : 'Install'}
      </S.ActionButton>
    </S.Container>
  );
};

export default PwaBanner;
