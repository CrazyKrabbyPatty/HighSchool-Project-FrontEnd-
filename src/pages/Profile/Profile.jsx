import React from 'react';
import Navbar from "../../component/UI/Navbar/Navbar";
import classes from "./Profile.module.css";
import ProfileIco from "./Source/profile-icon.svg"
import RubleIco from "./Source/ruble-symbol.svg"
import ButtonBlock from "../../component/UI/button/ButtonBlock";

const Profile = () => {
    return (
        <div className={classes.profile_body}>

            <Navbar />

            <main className={classes.profile_main}>

                <div className={classes.first_column}>

                    <div className={classes.profile}>
                        <img src={ProfileIco} alt="ProfileIco" className={classes.profile_img} />
                        <div className={classes.profile_text}>
                            <p className={classes.profile_text_name}>Святослав</p>
                            <p className={classes.profile_text_date}>Регистрация 12.01.2024</p>
                        </div>
                    </div>

                    <div className={classes.finances}>

                        <p className={classes.profile_text_name}>Финансы</p>

                        <div className={classes.finances_card}>

                            <div className={classes.finances_card_top}>

                                <div className={classes.ruble_symbol_circle}>
                                    <img src={RubleIco}/>
                                </div>

                                <div className={classes.finances_card_top_text}>
                                    <p className={classes.balance_card}>Баланс карты</p>
                                    <p className={classes.amount_rubles}>943 ₽</p>
                                </div>

                            </div>

                            <div className={classes.replenish}>
                                <ButtonBlock>Пополнить</ButtonBlock>
                            </div>

                        </div>
                    </div>

                    <div className={classes.terms_conditions}>
                        <p className={classes.profile_text_name}>Условия и сервис</p>

                        <div className={classes.conditions_of}>
                            <p className={classes.balance_card}>Условия оплаты</p>
                        </div>

                        <div className={classes.conditions_of}>
                            <p className={classes.balance_card}>Условия возврата</p>
                        </div>
                    </div>

                </div>

                <div className={classes.second_column}>
                    <p className={classes.profile_text_name}>История заказов</p>
                    <div className={classes.history_of_orders}></div>
                </div>

            </main>

        </div>
    );
};

export default Profile;