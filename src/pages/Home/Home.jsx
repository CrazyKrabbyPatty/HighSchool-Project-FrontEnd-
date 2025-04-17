import {useContext} from "react";
import {AuthContext} from "../../context";
import classes from "./Home.module.css"
import Navbar from "../../component/UI/Navbar/Navbar";
import ProductCard from "../../component/UI/ProductCard/ProductCard";

const Home = () => {

    const { setIsAuth } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <body className={classes.background}>
            <Navbar />
            <ProductCard/>
            <h1>НИЖЕ ТЫКАЙ</h1>
            <button onClick={handleLogout}>Выйти</button>
        </body>
    );
};

export default Home;