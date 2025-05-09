import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import classes from "./Home.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";
import ProductCard from "../../component/UI/ProductCard/ProductCard";
import axios from "axios";
import homyak_img from "./Source/homiak.jpg"

const Home = () => {

    const {setIsAuth} = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState({}); // Храним изображения по ID продукта

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    const FetchProducts = async (event) => {
        // event.preventDefault();
        // console.log(token)
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

            // Загружаем изображения для каждого продукта
            response.data.content.forEach(product => {
                GetImageById(product.id);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const GetImageById = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:8082/product/source`,
                {
                    params: {
                        productId: id
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    responseType: 'arraybuffer' // Устанавливаем правильный тип для бинарных данных
                }
            );

            console.log(response);

            // Преобразуем ArrayBuffer в Blob, чтобы создать URL
            // const blob = new Blob([response.data], { type: response.headers['content-type'] || 'image/jpeg' });
            const blob = new Blob([response.data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);

            console.log(imageUrl);

            setImages(prev => ({
                ...prev,
                [id]: imageUrl
            }));

        } catch (error) {
            console.error(`Ошибка загрузки изображения для продукта ${id}:`, error);
            setImages(prev => ({
                ...prev,
                [id]: homyak_img // Заглушка
            }));
        }
    }


    useEffect(() => {
        FetchProducts();
    }, [])

    return (
        <div className={classes.background}>
            <Navbar />
            <main className={classes.home_main}>
                <button onClick={handleLogout}>Выйти</button>
                <div className={classes.productsContainer}>
                    {products.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                            <ProductCard
                                image={images[product.id]}
                                name={product.name}
                                cost={product.price}
                                rating={product.rating}
                            />
                        </Link>
                    ))}
                </div>
                <h1>НИЖЕ ТЫКАЙ</h1>

                <button onClick={FetchProducts}>Взять продукты</button>
            </main>
        </div>
    );
};

export default Home;