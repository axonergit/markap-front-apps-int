import MyNavbar from "../Components/Navbar.jsx";
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient.js";
import ProductoImage from "../Components/ProductoIndividual/ProductoImage.jsx";
import { useParams } from "react-router-dom";
import ProductoInfo from "../Components/ProductoIndividual/ProductoInfo.jsx";
import ProductoCantidad from "../Components/ProductoIndividual/ProductoCantidad.jsx";
import { useEffect, useState } from "react";
import ProductoAgregarCarrito from "../Components/ProductoIndividual/ProductoAgregarCarrito.jsx";
import ProductoAgregarLike from "../Components/ProductoIndividual/ProductoAgregarLike.jsx";
import {Spinner} from "@nextui-org/react";

const ProductoIndividual = () => {
    const { productId } = useParams();
    const [cantidadActual, setCantidadActual] = useState(0);
    const [cantidad, setCantidad] = useState(0);

    const { data: ProductoResponse, isLoading, error } = useQuery({
        queryKey: ['Producto', productId],
        queryFn: async () => {
            const response = await axiosClient.get(`/productos/${productId}`);
            return response.data;
        },
        staleTime: 1000 * 5,
    });

    useEffect(() => {
        document.title = `Markap - Producto`;
    }, [ProductoResponse]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosClient.get('/carrito/actual/items');
                const datos = response.data.content;
                const productoResultado = datos?.find(
                    (productos) => productos.product.id == productId
                );
                if (productoResultado) setCantidadActual(productoResultado.amount);
            } catch (err) {
                console.error("Error al obtener la cantidad actual en el carrito:", err);
            }
        }
        fetchData();
    }, [productId]);

    return (
        <>
            <MyNavbar />
            <div className="flex flex-row text-base-content h-screen" style={{
                paddingTop: "2rem",
                paddingLeft: "12rem",
                gap: "2rem",
            }}>
                {error && "No existe tal producto"}
                {isLoading && <Spinner/>}
                {ProductoResponse && (
                    <>
                    <ProductoImage productoJson={ProductoResponse} />
                    <div style={{ display: "flex",
                        flexGrow: "1",
                        flexDirection: "column",
                        gap: "2vh",
                         }}>
                        <ProductoInfo productoJson={ProductoResponse} />
                        {ProductoResponse.stock ? (
                            <>
                                <ProductoCantidad
                                    productoJson={ProductoResponse}
                                    cantidad={cantidad}
                                    cantidadQuery={cantidadActual}
                                    setCantidad={setCantidad}
                                />
                                <div className="flex flex-row" style={{
                                    alignItems: "center",
                                    gap: ".5rem",
                                    marginLeft: "6vh"
                                }}>
                                    <ProductoAgregarCarrito
                                        productoJson={ProductoResponse}
                                        cantidad={cantidad}
                                        setCantidad={setCantidad}
                                    />
                                    <ProductoAgregarLike productoJson={ProductoResponse} />
                                </div>
                            </>
                        ) : (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                paddingTop: "1rem",
                                paddingLeft: "4rem",
                                fontWeight: "bold",
                            }}>
                                <p>NO HAY STOCK</p>
                            </div>
                        )}
                    </div>
                    </>)}
            </div>
        </>
    );
}

export default ProductoIndividual;