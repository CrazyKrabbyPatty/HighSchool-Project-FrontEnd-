import React, { useEffect, useState, useContext } from 'react';
import {Link, useParams} from 'react-router-dom';
import classes from './ProductIdPage.module.css';
import Navbar from "../../component/UI/Navbar/Navbar";
import comm_stat_img from "./Source/comments-statistic.svg"
import checked_user_img from "./Source/checked-user.svg"
import global_ico_img from "./Source/global-icon.svg"
import star_img from "./Source/star.svg"
import PostProducts from "../../API/PostProducts";
import {useImageLoader} from "../../hooks/useImageLoader";
import ProductCardSmall from "../../component/UI/ProductCardSmall/ProductCardSmall";
import PostComments from "../../API/PostComments";
import ButtonBlock from "../../component/UI/button/ButtonBlock";

const ProductIdPage = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const userId = useState("");

    const [product, setProduct] = useState(null);
    const [altproducts, setAltProducts] = useState([]);
    const {images, getImageById} = useImageLoader();

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const fetchProduct = async () => {
        try {
            console.log(token);
            // Загружаем основной продукт
            const productData = await PostProducts.getProductsById({id, token});
            setProduct(productData);

            // Загружаем изображение для основного продукта
            getImageById(productData.id, token);

            // Загружаем похожие продукты
            const altproductsData = await PostProducts.getFilteredProducts({
                limit: 3,
                token
            });
            setAltProducts(altproductsData);

            // Загружаем изображения для похожих продуктов
            altproductsData.forEach(product => {
                getImageById(product.id, token);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const Upload_Comment = async (event) => {
        event.preventDefault()
        try{
            const response = PostComments.PublicateComment(
                userId,
                id,
                comment,
                rating,
                token
            )
            console.log(response)
        } catch (error){
            console.log(error)
        }
    }

    const fetchComments = async () => {
        console.log(id)
        const commentData = await PostComments.getComments(
            id,
            token
        );
        console.log(commentData);
    }

    useEffect(() => {
        fetchProduct();
        fetchComments();
    }, [id, token]);

    if (!product) return <div>Товар не найден</div>;

    return (
        <div className={classes.background}>
            <Navbar/>
            <main className={classes.product_id_page_main}>

                <div className={classes.column_first}>

                    <div className={classes.main_information}>
                        <img src={images[product.id]} className={classes.image} alt="картинка товара"/>
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

                    <div className={classes.similar_products_placeholder_main}>
                        <p className={classes.description_title}>Рекомендуем также</p>
                        <div className={classes.similar_products_placeholder}>
                            {
                                altproducts.map((product) => (
                                    <Link to={`/product/${product.id}`} key={product.id} className={classes.link}>
                                        <ProductCardSmall
                                            image={images[product.id]}
                                            name={product.name}
                                            cost={product.price}
                                        />
                                    </Link>
                                    )
                                )
                            }
                        </div>
                    </div>

                    <div className={classes.comments_block}>

                        <p>Отзывы на товар</p>

                        <form onSubmit={Upload_Comment}>
                            <textarea
                                className={classes.ProductDescription}
                                placeholder="Комментарий"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            <input
                                placeholder="Рейтинг"
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />

                            <button type="submit">
                                Отправить комменатрий
                            </button>
                        </form>

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