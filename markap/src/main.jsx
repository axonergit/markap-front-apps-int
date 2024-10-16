import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Landing from './Pages/Landing.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Me from "./Pages/Me.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter(
    [
        {path: '/', element: <Landing/>},
        {path: '/login', element: <Login/>},
        {path: '/register', element: <Register/>},
        {path: '/me', element: <Me/>},
    ]
)

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NextUIProvider locale="es-ES">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </NextUIProvider>
    </StrictMode>,
)
