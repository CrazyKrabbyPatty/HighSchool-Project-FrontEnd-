import React from 'react';
import classes from "./ButtonBlock.module.css";

const ButtonBlock = ({children, ...props}) => {
    return (
        <button className={classes.auth_button} {...props}>
            {children}
        </button>
    );
};

export default ButtonBlock;