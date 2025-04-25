import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import classes from './Registration.module.css';
import InputBlock from "../../component/UI/input/InputBlock";
import ButtonBlock from "../../component/UI/button/ButtonBlock";

const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                "http://localhost:8080/identity/authentication/signup",
                { username, password, email }
            );
            navigate("/login"); // После регистрации перенаправляем на вход
        } catch (err) {
            setError("Ошибка регистрации");
            console.error("Ошибка:", err);
        }
    };

    return (
        <div className={classes.auth_background}>
            <div className={classes.auth_container}>

                <h1 className={classes.auth_title}>Регистрация</h1>

                <p className={classes.auth_subtext}>
                    Есть аккаунт? <Link className={classes.auth_link} to="/login">Войти в аккаунт</Link>
                </p>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={register}>
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
                    <InputBlock
                        type="email"
                        placeholder="Введите почту (необязательно)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ButtonBlock type="submit">Зарегистрироваться</ButtonBlock>
                </form>

            </div>
        </div>
    );
};

export default Registration;