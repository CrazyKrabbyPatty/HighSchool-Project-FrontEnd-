import React, {useState} from 'react';
import Navbar from "../../component/UI/Navbar/Navbar";
import classes from "./CreateProduct.module.css";
import axios from "axios";

const CreateProduct = () => {
    const [ProductName, setProductName] = useState("");
    const [ProductDescription, setProductDescription] = useState("");
    const [cost, setCost] = useState(0.0);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

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

                        {
                            image ?
                            (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt='Предпросмотр'
                                    className={classes.image_placeholder}
                                />
                            )
                            :
                            (
                                <div className={classes.image_placeholder_missing}>
                                    <p>Изображение недоступно</p>
                                </div>
                            )
                        }

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

                        <textarea
                            className={classes.ProductDescription}
                            placeholder="Описание товара"
                            value={ProductDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />

                        <input
                            className={classes.Price}
                            value={cost}
                            type="number"
                            onChange={(e) => setCost(parseFloat(e.target.value))}
                            placeholder="Рыночная стоимость"
                        />

                        <p className={classes.text_big_image}>Изображение</p>

                        <div className={classes.fileUploadContainer}>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={classes.hiddenInput}
                            />
                            <label htmlFor="fileInput" className={classes.customButton}>
                                Выберите файл
                            </label>
                            {image && <span>{image.name}</span>}
                        </div>

                        <div className={classes.information}>
                            <p>Внимание!</p>
                            <p>Изображение может иметь максимальный размер 100x100!</p>
                        </div>

                    </div>
                </form>

            </main>
        </div>
    );
};

export default CreateProduct;