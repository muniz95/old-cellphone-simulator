import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { closeModal } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
// import '../styles/Modal.scss';
import S from './styled';
import { SettingsContext } from '@/context/settings/context';
import { useContext } from 'react';

const Modal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootState) => state);
  const { color } = useContext(SettingsContext);

  let checked = false;
  if (showModal) {
    setTimeout(() => {
      const location = {
        pathname: '/',
      };
      dispatch(closeModal());
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
