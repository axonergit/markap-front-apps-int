import React, { useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProductoAgregarCarrito({ productoJson, cantidad, setCantidad }) {
    const navigate = useNavigate();

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

    useEffect(() => {
        let timer;
        if (agregarAlCarrito.isSuccess || agregarAlCarrito.isError) {
            timer = setTimeout(() => {
                if (agregarAlCarrito.isSuccess) {
                    navigate("../carrito");
                } else if (agregarAlCarrito.isError) {
                    setCantidad(0);
                }
                agregarAlCarrito.reset();
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [agregarAlCarrito.isSuccess, agregarAlCarrito.isError, navigate, setCantidad]);

    const handleAgregarAlCarrito = () => {
        if (cantidad > 0) {
            agregarAlCarrito.mutate({ productId: productoJson.id, amount: cantidad });
        }
    };

    return (
        <>
            <Button
                className="w-[260px] h-[60px]"
                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                color="primary"
                size="lg"
                onClick={handleAgregarAlCarrito}
                disabled={cantidad === 0}
            >
                {!agregarAlCarrito.isLoading && "AGREGAR AL CARRITO"}
                {agregarAlCarrito.isLoading && <Spinner />}
            </Button>

            {agregarAlCarrito.isSuccess && (
                <div
                    role="alert"
                    className="alert alert-success"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        padding: "0.8rem 1.2rem",
                        color: "white",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        maxWidth: "300px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Añadido al Carrito</span>
                </div>
            )}

            {agregarAlCarrito.isError && (
                <div
                    role="alert"
                    className="alert alert-error"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        padding: "0.8rem 1.2rem",
                        color: "white",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        maxWidth: "300px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Error al Agregar al Carrito</span>
                </div>
            )}
        </>
    );
}
