import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";
import ScriptProductsProfile from "./ScriptProductsProfile.jsx";

export default function LikedProducts() {

    const { likedProducts ,isLoading, error } = useQuery({
        queryKey: ['Likeados'],
        queryFn: async () => {
            const response = await axiosClient.get('/products/me');
            return response.data;
        },
        staleTime: 1000 * 60 * 2
    });

    // if (isLoading) return <span> Cargando Articulos Likeados... </span> ;
    // if (error) return <span> Error cargando Articulos Likeados </span> ;

    return(
        <div className="liked-products">
            <ScriptProductsProfile products={likedProducts} />
        </div>
    );
}