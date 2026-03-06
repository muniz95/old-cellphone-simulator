import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import S from './styled';
import { useSettingsStore } from '@/features/settings/state/settings-store';
import { useUiStore } from '@/stores/ui-store';

const Modal = () => {
  const navigate = useNavigate();
  const showModal = useUiStore((state) => state.showModal);
  const closeModal = useUiStore((state) => state.closeModal);
  const color = useSettingsStore((state) => state.color);

  useEffect(() => {
    if (!showModal) return;

    const timeout = setTimeout(() => {
      closeModal();
      navigate('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [closeModal, navigate, showModal]);

  return (
    <S.ModalContainer showModal={showModal} color={color}>
      <div>
        <input
          type="checkbox"
          name="ok"
          id="ok"
          style={{ opacity: 0 }}
          readOnly
          checked={showModal}
        />
        <label htmlFor="ok">
          <span>&nbsp;</span>
          <ins>
            <i>Done!</i>
          </ins>
        </label>
      </div>
    </S.ModalContainer>
  );
};

export default Modal;
