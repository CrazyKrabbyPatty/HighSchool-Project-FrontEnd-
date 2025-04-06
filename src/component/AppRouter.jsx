import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Unauthorized_Routes, Authorized_Routes} from "../router/routes";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    return (

        <Routes>
            {!isAuth && Unauthorized_Routes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    element={route.element}
                />
            ))}

            {isAuth && Authorized_Routes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    element={route.element}
                />
            ))}

            <Route
                path="/*"
                element={<Navigate to={isAuth ? "/home" : "/login"} replace />}
            />

        </Routes>
    );
};

export default AppRouter;