import React from "react";
import classes from './Button.module.css'


const button = (props) => {

    let buttonStyle = [classes.Button]
    buttonStyle.push([classes[props.btnType]].join(' '))

    return (
        <button
            className={buttonStyle.join(' ')}
            onClick={props.clicked}
            disabled={props.disableButton}>
            {props.children}
        </button>
    )
}

export default button;