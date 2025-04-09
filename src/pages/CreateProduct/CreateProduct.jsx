import React from 'react';
import Navbar from "../../component/UI/Navbar/Navbar";
import classes from "./CreateProduct.module.css";

const CreateProduct = () => {
    return (
        <body className={classes.CreateProduct_body}>
            <Navbar />

            <main className={classes.CreateProduct_main}>
                <div className={classes.column}>
                    <p className={classes.text_big}>Создание товара</p>
                    <img src='#' alt='Изображение недоступно' className={classes.image_placeholder}/>
                    <p className={classes.text_big}>Категория товара</p>
                </div>
                <div className={classes.column}>

                </div>
            </main>
        </body>
    );
};

export default CreateProduct;