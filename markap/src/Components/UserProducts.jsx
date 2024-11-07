import axiosClient from "../config/axiosClient.js";
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@nextui-org/react';
import ScriptProductsProfile from "./ScriptProductsProfile.jsx";
import React from "react";

export default function UserProducts() {

    const {data: userProducts, error, isLoading} = useQuery({
        queryKey: ['userProducts'],
        queryFn: async () => {
            const response = await axiosClient.get('/products/me');
            return response.data;
        },
        staleTime: 1000 * 60 * 2
    });

    // if (isLoading) return <span> Cargando Articulos en Venta... </span>;
    // if (error) return <span> Error al Cargar Articulos en Venta </span>

    return (
        <div className="user-products">
            <ScriptProductsProfile products={userProducts} />
        </div>
    );
}