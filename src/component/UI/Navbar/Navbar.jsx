import React from "react";
import {Link} from "react-router-dom";
import classes from "./Navbar.module.css";
import logo_img from "./Source/logo-icon.svg"
import market_img from "./Source/market-icon.svg"
import team_img from "./Source/team.svg"
import cart_img from "./Source/cart-image.svg"
import order_img from "./Source/order-image.svg"
import profile_img from "./Source/profile-icon.svg"

const Navbar = () => {
    return (
        <header className={classes.container}>

            <div className={classes.navbar}>

                <Link to="/home" className={classes.link}>
                    <div className={classes.block_left}>
                        <img src={logo_img} alt="logo" draggable={false} className={classes.svg_big}/>
                    </div>
                </Link>

                <div className={classes.logo_text}>
                    <p>NodeSale</p>
                    <span>Продавать проще, чем кажется</span>
                </div>

                <div className={classes.block_Market}>
                    <img src={market_img} alt="" draggable={false} className={classes.svg_small}/>
                    <p>Товары</p>
                </div>

                <div className={classes.block_Team}>
                    <img src={team_img} draggable={false} className={classes.svg_small}/>
                    <p>Партнёрам</p>
                </div>

                <div className={classes.search_block}>
                    <p>Поисковая строка</p>
                </div>

                <div className={classes.block_OrdersCart}>
                    <img src={cart_img} alt="" draggable={false} className={classes.svg_small}/>
                    <p>Корзина</p>
                </div>

                <div className={classes.block_OrdersCart}>
                    <img src={order_img} alt="" draggable={false} className={classes.svg_small}/>
                    <p>Заказы</p>
                </div>

                <Link to="/profile" className={classes.link}>
                    <div className={classes.block_right}>
                        <img src={profile_img} alt="" draggable={false} className={classes.svg_medium}/>
                        <p>Профиль</p>
                    </div>
                </Link>

            </div>

        </header>
    );
};

export default Navbar;
