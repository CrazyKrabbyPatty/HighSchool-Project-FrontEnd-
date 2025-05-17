import {useContext, useEffect, useState} from "react";
import {useImageLoader} from '../../hooks/useImageLoader';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import classes from "./Home.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";
import ProductCard from "../../component/UI/ProductCard/ProductCard";
import hamster_img from "./Source/homiak.jpg"
import PostProducts from "../../API/PostProducts";


const Home = () => {

    const token = localStorage.getItem("token");
    const {setIsAuth} = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const { images, getImageById } = useImageLoader();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    const FetchProducts = async () => {
        try {
            const productsData = await PostProducts.getFilteredProducts(
                {
                    limit: 100,
                    token
                }
            )

            setProducts(productsData);

            console.log(productsData)

            productsData.forEach(product => {
                getImageById(product.id, token);
            });
        } catch (error) {
            console.error("Ошибка загрузки продукта: ", error);
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
                        <Link to={`/product/${product.id}`} key={product.id} className={classes.link}>
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