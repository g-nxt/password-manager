import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './PasscodeConfirmation.module.css'
import NewPasscode from "../NewPasscode/NewPasscode";

class PasscodeConfirmation extends Component {

    state = {
        /*pin: this.props.pin,*/
        incorrectPin: false,
        usersPin: ''
    }

    render() {

        const pinOnChangehandler = (e) => this.setState({usersPin: e.target.value})

        const authenticate = () => {
            if (this.props.pin === this.state.usersPin) {
                this.setState({
                    userPin: ''
                })
                this.props.passcodeConfirmed()
            } else {
                this.setState({
                    incorrectPin: true,
                })
            }
        }

        const newPinHandler = (newPin) => {
            this.setState({pin: newPin})
            this.props.passcodeConfirmed()
        }

        let errorMessage
        if (this.state.incorrectPin) {
            errorMessage = <h6 className={classes.incorrectPin}>* Incorrect Pin, Please try again</h6>
        }

        return (
            /*<Modal show={this.props.show} modalClosed={this.props.modalClosed}>*/
            (!this.props.pin) ? <NewPasscode getPin={newPinHandler} passcodeCanceled={this.props.passcodeCanceled}/> :
                <div>
                    {errorMessage}
                    <input
                        className={classes.pinBox}
                        type="password"
                        name="Passcode"
                        placeholder="Enter Pin"
                        onChange={pinOnChangehandler}/>
                    <div className={classes.buttons}>
                        <Button btnType="Danger" clicked={this.props.passcodeCanceled}>Cancel</Button>
                        {/*<Button btnType="Success" clicked={this.props.passcodeConfirmed}>Confirm</Button>*/}
                        <Button btnType="Success" clicked={authenticate}>Confirm</Button>
                    </div>
                </div>
            /*{this.props.children}*/
            /*</Modal>*/
        )
    }
}

export default PasscodeConfirmation