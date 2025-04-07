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

                    <div className={classes.logo}>
                        <img src={logo_img} alt="logo" draggable={false} className={classes.svg_big}/>

                        <div className={classes.logo_text}>
                            <p>NodeSale</p>
                            <p className={classes.p_lower}>
                                Продавать проще, чем кажется
                            </p>
                        </div>
                    </div>

                </Link>

                <Link to="/home" className={classes.link}>

                    <div className={classes.MarketTeam}>

                        <div className={classes.block_MarketTeam}>
                            <img src={market_img} alt="" draggable={false}/>
                            <p>Товары</p>
                        </div>

                        <div className={classes.block_MarketTeam}>
                            <img src={team_img} draggable={false}/>
                            <p>Партнёрам</p>
                        </div>

                    </div>

                </Link>

                <div className={classes.search_block}>
                    <p>Поисковая строка</p>
                </div>

                <div className={classes.CartOrdersProfile}>

                    <Link to="/home" className={classes.link}>
                        <div className={classes.block_OrdersCartProfile}>
                            <img src={cart_img} alt="" draggable={false}/>
                            <p>Корзина</p>
                        </div>
                    </Link>

                    <Link to="/home" className={classes.link}>
                        <div className={classes.block_OrdersCartProfile}>
                            <img src={order_img} alt="" draggable={false}/>
                            <p>Заказы</p>
                        </div>
                    </Link>

                    <Link to="/home" className={classes.link}>
                        <div className={classes.block_OrdersCartProfile}>
                            <img src={profile_img} alt="" draggable={false}/>
                            <p>Профиль</p>
                        </div>
                    </Link>

                </div>

            </div>

        </header>
    );
};

export default Navbar;