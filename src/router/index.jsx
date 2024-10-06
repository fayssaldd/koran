import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Kuran from "../pages/Kuran";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/koran',
                element: <Kuran/>
            }
        ]
    }
])

export default router;