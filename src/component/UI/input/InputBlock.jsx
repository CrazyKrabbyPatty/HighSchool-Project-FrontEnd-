import React from 'react';
import classes from "./InputBlock.module.css";

const InputBlock = (props) => {
    return (
        <input className={classes.auth_input} {...props}/>
    );
};

export default InputBlock;