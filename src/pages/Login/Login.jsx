import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import classes from './Login.module.css';
import InputBlock from "../../component/UI/input/InputBlock";
import ButtonBlock from "../../component/UI/button/ButtonBlock";
import {AuthContext} from "../../context";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/identity/authentication/signin",
                { username, password }
            );
            // Предполагаем, что бэкенд возвращает JWT-токен
            localStorage.setItem("token", response.data.token);
            setIsAuth(true); // Меняем состояние авторизации
            navigate("/home"); // Перенаправляем на защищённую страницу
        } catch (err) {
            setError("Неверный логин или пароль");
            console.error("Ошибка входа:", err);
        }
    };

    return (
        <div className={classes.auth_background}>
            <div className={classes.auth_container}>

                <h1 className={classes.auth_title}>Авторизация</h1>

                <p className={classes.auth_subtext}>
                    Нет аккаунта? <Link className={classes.auth_link} to="/registration">Создать аккаунт</Link>
                </p>

                <form onSubmit={login}>
                    <InputBlock
                        type="text"
                        placeholder="Введите логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBlock
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonBlock type="submit">Подтвердить</ButtonBlock>
                </form>

            </div>
        </div>
    );
};

export default Login;