import React, {Fragment, useState} from "react";
import classes from "./User.module.css"
import Copy from "../../UI/Icons/copy-icon.png"
import Edit from "../../UI/Icons/edit-icon.png"
import Delete from "../../UI/Icons/delete-icon.png"
import UserForm from "../UserForm/UserForm";

const user = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [displayCopiedText, setDisplayCopiedText] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [delConfirmation, setDelConfirmation] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editUser, setEditUser] = useState(false)


    const pwdCopyHandler = (e) => {
        e.preventDefault()
        const copyText = document.createElement('textarea')
        copyText.style.opacity = "0"
        copyText.textContent = props.pwd
        document.body.appendChild(copyText)
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy")
        copyText.remove()
        setDisplayCopiedText(true)
    }

    let copyInputField = null;

    if (displayCopiedText) {
        copyInputField = <sup>Copied!</sup>
        setTimeout(() => {
            setDisplayCopiedText(false)
        }, 1500)
    } else {
        copyInputField = <input type="image" src={Copy} className={classes.copy} alt="" title="Copy Password"
                                onClick={pwdCopyHandler}/>
    }

    const delUserHandler = (e) => {
        e.preventDefault()
        props.delUserDetail(props.name, props.pwd[0])
        setDelConfirmation(false)
    }

    const delConfirmationHandler = () => setDelConfirmation(true)

    const delCancelHandler = () => setDelConfirmation(false)

    const editUserHandler = (e) => {
        e.preventDefault()
        setEditUser(true)
    }

    const editCancelHandler = () => {
        setEditUser(false)
    }

    let form = (
        <form className={classes.Input}>
            {copyInputField}
            <input type="image" src={Edit} className={classes.edit} onClick={editUserHandler} alt="" title="Edit"/>
            <input type="image" src={Delete} className={classes.delete} alt="" onClick={delConfirmationHandler}
                   title="Delete"/>
        </form>)

    let userStyle = [classes.User]

    if (props.delAppConfirmationPending) {
        userStyle = [classes.User, classes.deleteUser]
    }

    if (delConfirmation) {
        userStyle = [classes.User, classes.deleteUser]
        const redButton = [classes.Button, classes.red]
        const greenButton = [classes.Button, classes.green]
        form = (
            <Fragment>
                {/*<Passcode/>*/}
                <form className={classes.Input}>
                    <button className={greenButton.join(' ')} onClick={delCancelHandler}>Cancel</button>
                    <button className={redButton.join(' ')} onClick={delUserHandler}>Delete</button>
                </form>
            </Fragment>)
    }

    if (editUser) {
        form =
            <UserForm
                showUserForm={editCancelHandler}
                userDetail={props.editUserDetail}
                userValue={props.name}
                isEditUser={true}/>
    }

    return (
        <Fragment>
            {editUser ? form :
                <div className={userStyle.join(' ')}>
                    {props.name}
                    {form}
                </div>
            }
        </Fragment>
    )

}

export default user;