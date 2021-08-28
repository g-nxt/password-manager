import React from "react";
import classes from "./UsersList.module.css"
import User from "../User/User";
import AddUser from "../AddUser/AddUser";

const usersList = (props) => {

        let msg
        if (props.isUserEmpty) {
            msg = <h4>No users found, click plus icon below to add</h4>
        }

        return (
            <div className={classes.UsersList}>
                <h3>{props.app}</h3>
                {msg}
                {props.userList[0].map((usr, i) => {
                    return <User key={i} name={usr} pwd={props.pwdList.map(pwd => pwd[i])}
                                 delUserDetail={props.delUserDetail}
                                 editUserDetail={props.editUserDetail}
                                 delAppConfirmationPending={props.delAppConfirmationPending}/>
                })}
                <AddUser newUserDetail={props.newUserDetail} existingUsers={props.userList[0]}/>
            </div>
        )
}

export default usersList;