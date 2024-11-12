import MyNavbar from "../Components/Navbar.jsx";
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient.js";
import ProductoImage from "../Components/ProductoImage.jsx";
import { useParams } from "react-router-dom";
import ProductoInfo from "../Components/ProductoInfo.jsx";
import ProductoAgregar from "../Components/ProductoAgregar.jsx";
import {useEffect, useState} from "react";
import ProductoComprar from "../Components/ProductoComprar.jsx";

const ProductoVista = () => {

    const { productId } = useParams();
    const [cantidadActual, setCantidadActual] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const {data: ProductoResponse, isLoading, error} = useQuery({
        queryKey: ['Producto', productId],
        queryFn: async () => {
            const response = await axiosClient.get(`/productos/${productId}`);
            return response.data;
        },
        staleTime: 1000 * 60 * 2,
    })

    useEffect(() => {
        async function fetchData() {
            const response = await axiosClient.get('/carrito/actual/items');
            const datos = response.data.content;
            const productoResultado = datos?.find(
                (productos) => productos.product.id == productId
            );
            if (productoResultado) setCantidadActual(productoResultado.amount)
            console.log(productoResultado.amount)
        }
        fetchData();
    }, [])


    return (
        <div className="flex flex-col">
            <MyNavbar/>
            <div className="flex flex-row" style={{
                marginTop: "1rem",
                marginLeft: "12rem",
                gap: "2rem"
            }}>
                {ProductoResponse && <ProductoImage productoJson={ProductoResponse}/>}
                <div style={{display: "flex", flexGrow: "1", flexDirection: "column", gap: "2vh"}}>
                    {ProductoResponse && <ProductoInfo productoJson={ProductoResponse}/>}
                    {ProductoResponse && <ProductoAgregar productoJson={ProductoResponse}
                      cantidad={cantidad} cantidadQuery={cantidadActual} setCantidad={setCantidad}/>}
                    {ProductoResponse && <ProductoComprar productoJson={ProductoResponse} cantidad={cantidad}/>}
                </div>
            </div>
        </div>
    )
}

export default ProductoVista;