import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import {AuthContext} from "./context";

function App() {

    const [isAuth, setIsAuth] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true); // Если токен есть, считаем пользователя авторизованным
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
            <BrowserRouter>
                {!isLoading && <AppRouter/>}
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
