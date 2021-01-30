import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './NewPasscode.module.css'

class NewPasscode extends Component {

    state = {
        pin: '',
        confirmPin: '',
        pinMismatch: false,
        password: 'test',
        userPassword: '',
        incorrectPassword: false
    }

    render() {

        const pinOnChangehandler = (e) => this.setState({pin: e.target.value})

        const confirmPinOnChangehandler = (e) => {
            this.setState({
                confirmPin: e.target.value,
                pinMismatch: this.state.pin !== e.target.value
            })
        }

        const passwordOnChangehandler = (e) => this.setState({userPassword: e.target.value})

        const authenticate = () => {
            if (this.state.password === this.state.userPassword) {
                this.setState({
                    incorrectPassword: false,
                    userPassword: ''
                })
                this.props.getPin(this.state.pin)
            } else {
                this.setState({
                    incorrectPassword: true,
                })
            }
        }

        let pinMisMatch
        if (this.state.pinMismatch) {
            pinMisMatch = <h6 className={classes.incorrectPin}>Pin Mismatch</h6>
        }

        let errorMessage
        if (this.state.incorrectPassword) {
            errorMessage = <h6 className={classes.incorrectPin}>* Incorrect Password, Please try again</h6>
        }

        return (
            /*<Modal show={this.props.show} modalClosed={this.props.modalClosed}>*/
            <div>
                {errorMessage}
                <input
                    className={classes.pinBox}
                    type="password"
                    name="Passcode"
                    placeholder="Enter Pin"
                    onChange={pinOnChangehandler}/>
                {pinMisMatch}
                <input
                    className={classes.pinBox}
                    type="password"
                    name="ConfirmPasscode"
                    placeholder="Confirm Pin"
                    onChange={confirmPinOnChangehandler}/>
                <input
                    className={classes.pinBox}
                    type="password"
                    name="Password"
                    placeholder="Enter Password"
                    onChange={passwordOnChangehandler}/>
                <div className={classes.buttons}>
                    <Button btnType="Danger" clicked={this.props.passcodeCanceled}>Cancel</Button>
                    {/*<Button btnType="Success" clicked={this.props.passcodeConfirmed}>Confirm</Button>*/}
                    <Button btnType="Success"
                            disableButton={!this.state.pin | !this.state.confirmPin | this.state.pinMismatch | !this.state.userPassword}
                            clicked={authenticate}>Confirm</Button>
                </div>
            </div>
            /*{this.props.children}*/
            /*</Modal>*/
        )
    }


}

export default NewPasscode