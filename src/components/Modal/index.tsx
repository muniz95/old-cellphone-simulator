import { useNavigate } from 'react-router';
import S from './styled';
import { SettingsContext } from '@/context/settings/context';
import { useContext } from 'react';
import { GlobalContext } from '@/context/global/context';

const Modal = () => {
  const navigate = useNavigate();
  const { showModal, closeModal } = useContext(GlobalContext);
  const { color } = useContext(SettingsContext);

  let checked = false;
  if (showModal) {
    setTimeout(() => {
      const location = {
        pathname: '/',
      };
      closeModal();
      navigate(location);
    }, 3000);
    checked = true;
  }

  return (
    <S.ModalContainer showModal={showModal} color={color}>
      <div>
        <input
          type="checkbox"
          name="ok"
          id="ok"
          style={{ opacity: 0 }}
          readOnly
          checked={checked}
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
