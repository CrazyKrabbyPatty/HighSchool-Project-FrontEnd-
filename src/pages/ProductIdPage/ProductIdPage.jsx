import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './ProductIdPage.module.css';
import Navbar from "../../component/UI/Navbar/Navbar";
import comm_stat_img from "./Source/comments-statistic.svg"
import checked_user_img from "./Source/checked-user.svg"
import global_ico_img from "./Source/global-icon.svg"
import star_img from "./Source/star.svg"

const ProductIdPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(id)
            console.log(token)
            try {
                const productResponse = await axios.get(
                    `http://localhost:8082/product/catalog/search`,
                    {
                        params: {
                            by: "uuid",         // Обязательный параметр в том же формате
                            category: "uuid",   // Категория
                            value: id           // ID товара
                        },
                        paramsSerializer: params => {
                            return Object.entries(params)
                                .map(([key, value]) =>
                                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                                )
                                .join('&');
                        },
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "accept": "application/json"
                        }
                    }
                );

                // console.log("Response data:", productResponse.data); // Для отладки

                if (!productResponse.data) {
                    throw new Error('Данные товара не получены');
                }
                console.log(productResponse.data);
                setProduct(productResponse.data);
            } catch (err) {
                console.error("Full error:", err);
                console.error("Error response data:", err.response?.data);
                setError(err.response?.data?.message || err.message || 'Неизвестная ошибка');
            }

            // Загружаем изображение товара
            try {
                const imageResponse = await axios.get(
                    `http://localhost:8082/product/source`,
                    {
                        params: { productId: id },
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                        responseType: 'arraybuffer'
                    }
                );

                const blob = new Blob([imageResponse.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
            } catch (imageError) {
                console.error("Ошибка загрузки изображения:", imageError);
                setImage(null); // Или установите изображение-заглушку
            }

            try {
                const response = await axios.get(
                    "http://localhost:8082/product/catalog/search/filter",
                    {
                        params: {
                            offset: 0,
                            limit: 8,
                            filterType: "ASC",
                            sortBy: "id"
                        },
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                )
                // console.log(response);
                setProducts(response.data.content);

                console.log(products);

            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id, token]);

    if (error) return <div>Ошибка: {error}</div>;
    if (!product) return <div>Товар не найден</div>;

    return (
        <div className={classes.background}>
            <Navbar/>
            <main className={classes.product_id_page_main}>

                <div className={classes.column_first}>

                    <div className={classes.main_information}>
                        <img src={image} className={classes.image} alt="картинка товара"/>
                        <div className={classes.main_information_title}>
                            <span className={classes.main_information_name}>{product.name}</span>
                            <div className={classes.main_information_comments}>
                                <img src={comm_stat_img} alt="картинка комментариев"/>
                                <div>отзывов</div>
                            </div>
                            <span className={classes.main_information_about}>О товаре</span>
                            <div className={classes.main_information_type_time}>
                                <p className={classes.main_information_comments}>Тип товара</p>
                                <p>{product.category}</p>
                                <p className={classes.main_information_comments}>Срок эксплуатации</p>
                                <p>12 мес.</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.description}>
                        <span className={classes.description_title}>Описание</span>
                        <p>{product.description || 'Нет описания'}</p>
                    </div>

                </div>

                <div className={classes.column_second}>

                    <div className={classes.add_to_cart}>
                        <div className={classes.price}>
                            <p className={classes.price_text}>
                                {product.price} ₽
                            </p>
                            <p className={classes.price_text_small}>
                                {product.price} ₽ за ед.
                            </p>
                        </div>
                        <button className={classes.button}>
                            В корзину
                        </button>
                    </div>

                    <div className={classes.product_supplier}>
                        <div className={classes.product_supplier_title}>
                            <p className={classes.description_title}>Поставщик товара</p>
                            <img src={checked_user_img} alt="проверенный продавец"/>
                        </div>
                        <p className={classes.product_supplier_supp}>
                            Продавец
                        </p>
                        <div className={classes.product_supplier_help_me}>
                            <img src={global_ico_img} className={classes.product_supplier_img}/>
                            <div className={classes.product_supplier_name}>
                                <p className={classes.product_supplier_name_main}>Nglobal</p>
                                <p className={classes.product_supplier_name_supp}>Россия</p>
                            </div>
                        </div>
                        <p className={classes.product_supplier_supp}>
                            Рейтинг товаров
                        </p>
                        <div>
                            <img src={star_img}/>
                        </div>
                    </div>

                    <div>Рейтинг: {product.rating || 'нет оценок'}</div>
                </div>

            </main>
        </div>
    );
};

export default ProductIdPage;