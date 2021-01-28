import React, {Component} from "react";
import classes from './AddUser.module.css'
import Add from "../../UI/Icons/add-icon.png"
import UserForm from "../UserForm/UserForm";

class addUser extends Component {

    state = {
        showInputForm: false,
        userValue: '',
        passwdValue: ''
    }

    addUserHandler = () => {
        this.setState({showInputForm: true})

    }

    showUserFormHandler = (showForm) => {
        this.setState({
            showInputForm: showForm
        })
    }

    render() {

        let inputForm
        if (this.state.showInputForm) {
            inputForm = <UserForm
                showUserForm={this.showUserFormHandler}
                userDetail={this.props.newUserDetail}
                existingUsers={this.props.existingUsers}
            />
        } else {
            inputForm =
                <div className={classes.AddUser}>
                    <input type="image" src={Add} alt="" className={classes.Add} title="Add New User"
                           onClick={this.addUserHandler}/>
                </div>
        }

        return (
            <div>
                {inputForm}
            </div>
        );
    }
}


export default addUser;