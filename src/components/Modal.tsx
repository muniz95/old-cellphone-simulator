import { LocationDescriptorObject } from "history";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router";
import { closeModal } from "../redux/actions";
import '../styles/Modal.scss';

interface IProps extends RouteComponentProps<any> {
  dispatchCloseModal: () => {}
  showModal: boolean
}

class Modal extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }

  public render() {
    const { dispatchCloseModal, showModal } = this.props
    let checked = false
    if (showModal) {
      setTimeout(() => {
        const location: LocationDescriptorObject = {
          pathname: '/phonebook'
        }
        dispatchCloseModal()
        this.props.history.push(location)
      }, 3000)
      checked = true
    }
    return (
      <div className="modal" style={{display: this.props.showModal ? 'flex' : 'none'}}>
        <div className="modal-content">
          <input type="checkbox" name="ok" id="ok" style={{opacity: 0}} checked={checked} />
          <label htmlFor="ok">
            <span>&nbsp;</span>
            <ins><i>Done!</i></ins>
          </label>
        </div>
      </div>
    )
  }
};

const mapStoreToProps = (store: any) => {
  const { showModal } = store
  return {
    showModal
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchCloseModal: () => {
    dispatch(closeModal());
  }
});

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Modal))
