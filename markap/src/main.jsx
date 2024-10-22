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
import Categorias from './Components/Categorias.jsx';
import CategoriaProductos from './Components/CategoriaProductos.jsx';

const router = createBrowserRouter(
    [
        {path: '/', element: <Landing/>},
        {path: '/login', element: <Login/>},
        {path: '/register', element: <Register/>},
        {path: '/me', element: <Me/>},
        {path: '/categorias', element: <Categorias/>}, // Ruta para listar todas las categorías
        {path: '/categorias/:id', element: <CategoriaProductos/>}, // Ruta para los detalles de cada categoría
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
