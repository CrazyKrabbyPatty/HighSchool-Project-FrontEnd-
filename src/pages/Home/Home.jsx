import {useContext} from "react";
import {AuthContext} from "../../context";
import classes from "./Home.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";
import ProductCard from "../../component/UI/ProductCard/ProductCard";
import axios from "axios";

const Home = () => {

    const { setIsAuth } = useContext(AuthContext);

    const check_token = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Токен не найден");
                setIsAuth(false);
                return;
            }

            const response = await axios.post(
                "http://localhost:8081/identity/tokens/validate",
                { token },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.isValid) {
                console.log("Токен валиден");
            } else {
                console.log("Токен невалиден");
                setIsAuth(false);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Ошибка при проверке токена:", error);
            setIsAuth(false);
            localStorage.removeItem("token");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <div className={classes.background}>
            <Navbar />
            <ProductCard/>
            <h1>НИЖЕ ТЫКАЙ</h1>
            <button onClick={handleLogout}>Выйти</button>
            <button onClick={check_token}>Проверить токен</button>
        </div>
    );
};

export default Home;