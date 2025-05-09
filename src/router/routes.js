import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Cart from "../pages/Cart/Cart";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import ProductIdPage from "../pages/ProductIdPage/ProductIdPage";

export const Unauthorized_Routes = [
    {path: "/login", element: <Login />, exact: true},
    {path: "/registration", element: <Registration />, exact: true},
]

export const Authorized_Routes = [
    {path: "/home", element: <Home />, exact: true},
    {path: "/profile", element: <Profile />, exact: true},
    {path: "/cart", element: <Cart />, exact: true},
    {path: "/create-product", element: <CreateProduct />, exact: true},
    {path: "/product/:id", element: <ProductIdPage />, exact: true},
]