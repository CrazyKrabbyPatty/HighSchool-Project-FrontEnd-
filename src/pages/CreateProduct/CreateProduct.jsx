import React, {useState} from 'react';
import Navbar from "../../component/UI/Navbar/Navbar";
import classes from "./CreateProduct.module.css";
import axios from "axios";

const CreateProduct = () => {
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [ProductName, setProductName] = useState("");
    const [ProductDescription, setProductDescription] = useState("");
    const [cost, setCost] = useState("");
    const categories = ["Носки", "Бальзам", "СЛАУ"];
    const token = localStorage.getItem("token");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Проверка размера файла (пример: 3MB)
        if (file.size > 3 * 1024 * 1024) {
            alert("Файл слишком большой (макс. 3MB)");
            return;
        }

        setImage(file);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const Create_Product = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', ProductName);
            formData.append('description', ProductDescription);
            formData.append('category', category);
            formData.append('price', parseInt(cost));

            if (image) {
                formData.append('image', image);
            }

            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.post(
                "http://localhost:8082/product/catalog/create-product",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Ответ сервера:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        }
    };

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

                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className={classes.categorySelect}
                        >
                            <option value="" disabled hidden>
                                Выберите категорию
                            </option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat} className={classes.categorySelect}>
                                    {cat}
                                </option>
                            ))}
                        </select>
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
                            onChange={(e) => setCost(e.target.value)}
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
                            <p>Изображение может иметь максимальный объём 3мб!</p>
                        </div>

                    </div>
                </form>

            </main>
        </div>
    );
};

export default CreateProduct;