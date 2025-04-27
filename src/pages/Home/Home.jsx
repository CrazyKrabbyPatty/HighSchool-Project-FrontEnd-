import {useContext} from "react";
import {AuthContext} from "../../context";
import classes from "./Home.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";
import ProductCard from "../../component/UI/ProductCard/ProductCard";
import axios from "axios";

const Home = () => {

    const {setIsAuth} = useContext(AuthContext);
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    const FetchProducts = async (event) => {
        event.preventDefault();
        console.log(token)
        try {
            const response = await axios.get(
                "http://localhost:8082/product/catalog/search/filter",
                {
                    params: {
                        offset: 0,
                        limit: 8,
                        filterType: "ASC",
                        sortBy: ["id"]
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={classes.background}>
            <Navbar />
            <ProductCard/>
            <h1>НИЖЕ ТЫКАЙ</h1>
            <button onClick={handleLogout}>Выйти</button>
            <button onClick={FetchProducts}>Взять продукты</button>
        </div>
    );
};

export default Home;