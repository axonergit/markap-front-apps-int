import React from "react";
import {Button, Spinner, Tooltip} from "@nextui-org/react";
import {useMutation} from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";

// eslint-disable-next-line react/prop-types
export default function ProductoComprar( { productoJson, cantidad } ) {
    const agregarAlCarrito = useMutation({
        mutationFn: async ({ productId, amount }) => {
            const response = await axiosClient.put(`/carrito/add/${productId}`, {
                amount: amount,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Respuesta exitosa:", data);
        },
        onError: (error) => {
            console.error("Error al agregar al carrito:", error);
        }
    });

    const handleAgregarAlCarrito = () => {
        if (cantidad > 0){
            agregarAlCarrito.mutate({ productId: productoJson.id, amount: cantidad });
        }
    };

    return (
        <div>
            {agregarAlCarrito.isError && (
                <Tooltip color="error" content="Hubo un error al agregar al carrito">
                    <Button className="w-[260px] h-[60px]" style={{fontSize: "1.2rem", fontWeight: "bold"}}
                            disabled color="error" size="lg">
                        Error
                    </Button>
                </Tooltip>
            )}
            {agregarAlCarrito.isSuccess && (
                <Tooltip color="success" content="Producto agregado al carrito">
                    <Button className="w-[260px] h-[60px]" style={{fontSize: "1.2rem", fontWeight: "bold"}}
                            disabled color="success" size="lg">
                        Agregado
                    </Button>
                </Tooltip>
            )}

            {!agregarAlCarrito.isLoading && !agregarAlCarrito.isError && !agregarAlCarrito.isSuccess && (
                <Button className="w-[260px] h-[60px]" style={{fontSize: "1.2rem", fontWeight: "bold"}}
                        color="primary" size="lg" onClick={handleAgregarAlCarrito} disabled={cantidad==0}>
                    AGREGAR AL CARRITO
                </Button>
            )}

            {agregarAlCarrito.isLoading && (
                <Button className="w-[260px] h-[60px]" style={{fontSize: "1.2rem", fontWeight: "bold"}}
                        color="primary" size="lg" disabled>
                    <Spinner />
                </Button>
            )}
        </div>
    )
}