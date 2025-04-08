import React from 'react';
import classes from "./Cart.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";

const Cart = () => {
    return (
        <body className={classes.cart_body}>
            <Navbar/>

            <main className={classes.cart_main}>
                <div className={classes.first_column}>
                    <div className={classes.products}>

                    </div>
                </div>
                <div className={classes.second_column}>
                    <div className={classes.buy}>

                    </div>
                </div>
            </main>
        </body>
    );
};

export default Cart;