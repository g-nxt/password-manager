import React, {Component} from "react";
import Button from '../../components/UI/Button/Button'
import classes from './Passcode.module.css'

class Passcode extends Component {

    state = {
        pin: '9999',

    }

    render() {


        return (
            /*<Modal show={this.props.show} modalClosed={this.props.modalClosed}>*/
            <div>
                <input className={classes.pinBox} type="password" name="Passcode" placeholder="Enter Pin"/>
                <div className={classes.buttons}>
                    <Button btnType="Danger" clicked={this.props.passcodeCanceled}>Cancel</Button>
                    <Button btnType="Success" clicked={this.props.passcodeConfirmed}>Confirm</Button>
                </div>
            </div>
            /*{this.props.children}*/
            /*</Modal>*/
        )
    }


}

export default Passcode