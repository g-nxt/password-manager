import React from "react";
import classes from './Header.module.css'

const header = (props) => {

    return (
        <header className={classes.Page}>
            <div>
                <h2>Password Manager</h2>
            </div>
        </header>
    )
}

export default header;