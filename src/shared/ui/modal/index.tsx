import { useEffect } from 'react';
import S from './styled';

interface ModalProps {
  color: string;
  isOpen: boolean;
  onAutoClose?: () => void;
  autoCloseMs?: number;
  message?: string;
}

const Modal = ({
  color,
  isOpen,
  onAutoClose,
  autoCloseMs = 3000,
  message = 'Done!',
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen || !onAutoClose) return;

    const timeout = setTimeout(() => {
      onAutoClose();
    }, autoCloseMs);

    return () => clearTimeout(timeout);
  }, [autoCloseMs, isOpen, onAutoClose]);

  return (
    <S.ModalContainer showModal={isOpen} color={color}>
      <div>
        <S.HiddenCheckbox name="ok" id="ok" readOnly checked={isOpen} />
        <label htmlFor="ok">
          <span>&nbsp;</span>
          <ins>
            <i>{message}</i>
          </ins>
        </label>
      </div>
    </S.ModalContainer>
  );
};

export default Modal;
