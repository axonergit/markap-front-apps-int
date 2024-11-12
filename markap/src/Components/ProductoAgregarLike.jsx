import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";

// eslint-disable-next-line react/prop-types
export default function ProductoAgregarLike({ productoJson }) {
    const queryClient = useQueryClient();
    const [isLiked, setIsLiked] = useState(false);

    const { data: likedProducts } = useQuery({
        queryKey: ["likedProducts"],
        queryFn: async () => {
            const response = await axiosClient.get("/productos/liked/");
            const array = response.data;
            const isProductLiked = array.some((product) => product.descripcion === productoJson.descripcion);
            if (isProductLiked) setIsLiked(true);
            return response.data;

        },
        enabled: !!productoJson
    });


    const addLikeMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosClient.post(`/productos/liked/${productoJson.id}`);
            return response.data;
        },
        onSuccess: () => {
            setIsLiked(true);
            queryClient.invalidateQueries({ queryKey: ["likedProducts"] });
        },
        onError: (error) => {
            console.error("Error al agregar a favoritos:", error);
        }
    });

    const removeLikeMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosClient.delete(`/productos/liked/${productoJson.id}`);
            return response.data;
        },
        onSuccess: () => {
            setIsLiked(false);
            queryClient.invalidateQueries({ queryKey: ["likedProducts"] });
        },
        onError: (error) => {
            console.error("Error al eliminar de favoritos:", error);
        }
    });

    const handleLikeCambio = () => {
        if (isLiked) {
            removeLikeMutation.mutate();
        } else {
            addLikeMutation.mutate();
        }
    };

    return (
        <button className="btn" onClick={handleLikeCambio} style={{ display: "flex", alignItems: "center" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isLiked ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
}
