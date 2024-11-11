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
import Categorias from './Components/Landing/Categorias.jsx';
import CategoriaProductos from './Components/CategoriaProductos.jsx';
import Carrito from "./Pages/Carrito.jsx";
import Productos from "./Pages/Productos.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import productoVista from "./Pages/ProductoVista.jsx";
import ProductoVista from "./Pages/ProductoVista.jsx";


const router = createBrowserRouter(
    [
        {path: '/', element: <Landing/>},
        {path: '/login', element: <Login/>},
        {path: '/register', element: <Register/>},
        {path: '/me', element: <Me/>},
        {path: '/categorias', element: <Categorias/>}, // Ruta para listar todas las categorías
        {path: '/categorias/:id', element: <CategoriaProductos/>}, // Ruta para los detalles de cada categoría
        {path: '/admin/productos', element: <Productos />}, //Ruta para ver los productos creados
        {path: '/carrito', element: <Carrito />},  // Ruta carrito
        {path: '/producto/:productId', element: <ProductoVista/>} // Ruta producto
    ]
)

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <NextUIProvider locale="es-ES">
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}></RouterProvider>
                </QueryClientProvider>
            </NextUIProvider>
        </AuthProvider>
    </StrictMode>
);