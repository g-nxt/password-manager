import classes from "./UserForm.module.css";
import React, {Fragment, useState} from "react";
import {LOWER_CASE, NUMBERS, SPCL_CHAR, UPPER_CASE} from "./charType";
import Eye from "../../UI/Icons/eye.png";


const userForm = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userValue, setUserValue] = useState(props.userValue === undefined ? '' : props.userValue)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwdValue, setPasswdValue] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pswdStrengthVal, setPswdStrengthVal] = useState(0)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [strengthDetail, setStrengthDetail] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwordShown, setPasswordShown] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [abc, setabc] = useState('abc')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ABC, setABC] = useState('ABC')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [num, setNum] = useState('123')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [char, setChar] = useState('@#$')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [length, setLength] = useState('Length')

    const cancelHandler = () => {
        setUserValue('')
        setPasswdValue('')
        props.showUserForm(false)
    }

    const userSubmissionHandler = () => {
        props.userDetail(userValue, passwdValue)
        props.showUserForm(false)
        setUserValue('')
        setPasswdValue('')
    }

    const charValidation = (charType, passVal) => {
        if (passVal.length > 7) {
            setLength(<text>{length}</text>)
        } else {
            setLength('Length')
        }

        if (charType === SPCL_CHAR) {
            const matched = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(passVal)
            if (matched) {
                setChar(<text>{char}</text>)
            } else {
                setChar('@#$')
            }
            return matched
        } else if (charType === UPPER_CASE) {
            const matched = /[A-Z]/g.test(passVal)
            if (matched) {
                setABC(<text>{ABC}</text>)
            } else {
                setABC('ABC')
            }
            return matched
        } else if (charType === NUMBERS) {
            const matched = /[0-9]/g.test(passVal)
            if (matched) {
                setNum(<text>{num}</text>)
            } else {
                setNum('123')
            }
            return matched
        } else if (charType === LOWER_CASE) {
            const matched = /[a-z]/g.test(passVal)
            if (matched) {
                setabc(<text>{abc}</text>)
            } else {
                setabc('abc')
            }
            return matched
        } else {
            return false
        }
    }

    const userOnChange = (e) => setUserValue(e.target.value)


    const passwdOnChange = (e) => {
        const passVal = e.target.value
        setPasswdValue(passVal)
        switch (true) {
            case (charValidation(SPCL_CHAR, passVal)
                && charValidation(UPPER_CASE, passVal)
                && charValidation(NUMBERS, passVal)
                && charValidation(LOWER_CASE, passVal)
                && passVal.length > 7):
                setPswdStrengthVal(3)
                setStrengthDetail('Strong  :')
                break
            case (charValidation(LOWER_CASE, passVal)
                && charValidation(UPPER_CASE, passVal)
                && charValidation(NUMBERS, passVal)):
                setPswdStrengthVal(2)
                setStrengthDetail('Good    :')
                break
            case (charValidation(SPCL_CHAR, passVal)
                && charValidation(UPPER_CASE, passVal)
                && charValidation(LOWER_CASE, passVal)):
                setPswdStrengthVal(2)
                setStrengthDetail('Good    :')
                break
            case (charValidation(UPPER_CASE, passVal)
                && charValidation(NUMBERS, passVal)
                && charValidation(SPCL_CHAR, passVal)):
                setPswdStrengthVal(2)
                setStrengthDetail('Good    :')
                break
            case (charValidation(SPCL_CHAR, passVal)
                && charValidation(NUMBERS, passVal)
                && charValidation(LOWER_CASE, passVal)):
                setPswdStrengthVal(2)
                setStrengthDetail('Good    :')
                break
            case (charValidation(NUMBERS, passVal)
                && charValidation(SPCL_CHAR, passVal)):
                setPswdStrengthVal(2)
                setStrengthDetail('Good    :')
                break
            case charValidation(LOWER_CASE, passVal):
                setPswdStrengthVal(1)
                setStrengthDetail('Weak    :')
                break
            case charValidation(UPPER_CASE, passVal):
                setPswdStrengthVal(1)
                setStrengthDetail('Weak    :')
                break
            case charValidation(NUMBERS, passVal):
                setPswdStrengthVal(1)
                setStrengthDetail('Weak    :')
                break
            case charValidation(SPCL_CHAR, passVal):
                setPswdStrengthVal(1)
                setStrengthDetail('Weak    :')
                break
            case passVal === '':
                setPswdStrengthVal(0)
                setStrengthDetail('')
                break
            default:
                break
        }
    }

    let pswdStrength = null


    if (pswdStrengthVal > 0) {
        pswdStrength =
            (<Fragment>
                <h5>{strengthDetail}</h5>
                <progress max='3' value={pswdStrengthVal}/>
                <text
                    className={classes.pswdValidationText}>{abc}{'    '}{ABC}{'    '} {num}{'    '} {char}{'    '} {length}</text>
            </Fragment>)
    }

    let war

    const exstUserList = props.existingUsers === undefined ? [] : props.existingUsers.toString().toLowerCase().split(',')

    if ((exstUserList.indexOf(userValue.toLowerCase()) > -1) && !(exstUserList.indexOf('') > -1)) {
        war = <h6 className={classes.warning}>* User Name already exist</h6>
    }

    const redButton = [classes.Button, classes.red]
    const greenButton = [classes.Button, classes.green]

    let userNameStyle = [classes.inputField]
    let newUserStyle = [classes.newUser]
    if (war) {
        //userNameStyle.push(classes.userNameWarning)
        newUserStyle = [classes.newUser, classes.newUserWarning]
    }
    if (passwdValue.length > 0) {
        newUserStyle.push(classes.pswdValidationDisplayed)
    }

    let userInputField =
        <input
            className={userNameStyle}
            type="text"
            name="UserName"
            placeholder="Enter User"
            autoFocus={true}
            onChange={userOnChange}/>

    let title = <h4>Add New User</h4>


    if (props.isEditUser) {
        userInputField =
            <input
                className={classes.inputField}
                type="text"
                name="UserName"
                disabled={props.isEditUser}
                value={userValue}
                title="User Name can't be edited"/>
        title = <h4>Edit Password</h4>
        war = null
    }

    const togglePasswordVisiblity = (e) => {
        e.preventDefault()
        setPasswordShown(!passwordShown)
        setTimeout(() => {
            setPasswordShown(false)
        }, 5000)
    }


    return (
        <div className={newUserStyle.join(' ')}>
            {title}
            <button className={redButton.join(' ')} onClick={cancelHandler}>Cancel</button>
            <button className={greenButton.join(' ')}
                    disabled={(userValue.length < 1 || passwdValue.length < 1) || war}
                    onClick={userSubmissionHandler}>Done
            </button>
            {war}
            <form>
                {userInputField}
                <input
                    className={classes.inputField}
                    type={passwordShown ? "text" : "password"}
                    name="Password"
                    placeholder="Enter Password"
                    autoFocus={props.isEditUser}
                    autoComplete="off"
                    onFocus={e => e.currentTarget.select()}
                    onChange={passwdOnChange}/>
                <input className={classes.eye}
                       type="image"
                       src={Eye}
                       alt=''
                       hidden={passwdValue.length < 1}
                       onClick={togglePasswordVisiblity}/>
                {pswdStrength}
            </form>
        </div>
    )

}

export default userForm