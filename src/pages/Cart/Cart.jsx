import React from 'react';
import classes from "./Cart.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";

const Cart = () => {
    return (
        <body className={classes.cart_body}>
            <Navbar/>

            <main className={classes.cart_main}>
                <div className={classes.column}>
                    <div className={classes.products}>

                    </div>
                </div>
                <div className={classes.column}>
                    <div className={classes.buy}>
                        <button className={classes.button}>
                            Оформить заказ
                        </button>
                        <div className={classes.your_cart}>
                            <p className={classes.your_cart_text}>Ваша корзина</p>
                            <p>4 шт</p>
                        </div>
                        <div className={classes.your_cart}>
                            <p>Товары</p>
                            <p>548 ₽</p>
                        </div>
                        <div className={classes.your_cart}>
                            <p>Списание</p>
                            <p>-548 ₽</p>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
};

export default Cart;