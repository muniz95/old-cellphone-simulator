import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { openModal } from "../../redux/actions";
import '../../styles/Home.scss';

interface IProps {
  dispatchOpenModal: () => {}
}

class PhoneBookAddName extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)

    this.saveContact = this.saveContact.bind(this)
  }

  public saveContact(e: React.MouseEvent<HTMLButtonElement>) {
    const name = (document.getElementById('name') as HTMLInputElement).value
    window.console.log(name)
    window.navigator.vibrate([500, 100, 500, 100, 1000])
    this.props.dispatchOpenModal()
  }

  public render() {
    return (
      <div className="home">
        <div>
          <input type="text" name="name" id="name"/>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>
          <button onClick={this.saveContact}>Save</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchOpenModal: () => {
    dispatch(openModal())
  }
})

export default connect(null, mapDispatchToProps)(PhoneBookAddName);
