import React, {useState} from 'react';
import Navbar from "../../component/UI/Navbar/Navbar";
import classes from "./CreateProduct.module.css";
import ButtonBlock from "../../component/UI/button/ButtonBlock";

const CreateProduct = () => {
    const [ProductName, setProductName] = useState("");
    const [ProductDescription, setProductDescription] = useState("");
    const [cost, setCost] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const Create_Product = async (event) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div className={classes.CreateProduct_body}>
            <Navbar />

            <main>

                <form onSubmit={Create_Product} className={classes.CreateProduct_main}>

                    <div className={classes.first_column}>
                        <p className={classes.text_big}>Создание товара</p>
                        <img src='#' alt='Изображение недоступно' className={classes.image_placeholder}/>
                        <p className={classes.text_big}>Категория товара</p>
                    </div>

                    <div className={classes.second_column}>
                        <div className={classes.ProductName_Publish}>
                            <input
                                className={classes.ProductName}
                                type="text"
                                placeholder="Введите название товара"
                                value={ProductName}
                                onChange={(e) => setProductName(e.target.value)}
                            />

                            <button className={classes.button} type="submit">
                                Опубликовать
                            </button>
                        </div>
                    </div>
                </form>

            </main>
        </div>
    );
};

export default CreateProduct;