import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import Home from "../../Pages/HomePage/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
{
    path:'/',
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/services/:id',
            loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`),
            element: <CheckOut></CheckOut>
        },
        {
            path: '/orders',
            element: <PrivateRoute><Orders></Orders></PrivateRoute>
        },
    ]
}
])

export default router