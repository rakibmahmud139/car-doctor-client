import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import CheckOut from "../pages/checkOut/CheckOut";
import Bookings from "../pages/bookings/Bookings";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/checkout/:id',
                element: <CheckOut />,
                loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: '/bookings',
                element: <PrivateRoute> <Bookings /></PrivateRoute>,

            }
        ]
    }
])







export default router;