import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './ProductIdPage.module.css';

const ProductIdPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(id)
            try {
                // Формируем точные параметры как в рабочем curl-запросе
                const params = {
                    "Field 'category'": 'uuid',
                    "Field 'value'": id
                };

                console.log("Request params:", params); // Для отладки

                const productResponse = await axios.get(
                    `http://localhost:8082/product/catalog/search`,
                    {
                        params: params,
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "accept": "application/json"
                        }
                    }
                );

                console.log("Response data:", productResponse.data); // Для отладки

                if (!productResponse.data) {
                    throw new Error('Данные товара не получены');
                }

                setProduct(productResponse.data);
            } catch (err) {
                console.error("Full error:", err);
                console.error("Error response data:", err.response?.data);
                setError(err.response?.data?.message || err.message || 'Неизвестная ошибка');
            }
        };

        fetchProduct();
    }, [id, token]);

    if (error) return <div>Ошибка: {error}</div>;
    if (!product) return <div>Товар не найден</div>;

    return (
        <div>
            <div>
                <h1>{product.name}</h1>
                <div>{product.price} ₽</div>
                <div>Рейтинг: {product.rating || 'нет оценок'}</div>

                <div>
                    <h3>Описание</h3>
                    <p>{product.description || 'Нет описания'}</p>
                </div>

            </div>
        </div>
    );
};

export default ProductIdPage;