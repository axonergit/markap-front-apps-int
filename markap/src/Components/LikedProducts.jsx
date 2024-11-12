import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";
import ProductsScript from "./ProductsScript.jsx";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function LikedProducts() {

    const {data: likedProducts ,isLoading, error } = useQuery({
        queryKey: ['Likeados'],
        queryFn: async () => {
            const response = await axiosClient.get('/productos/liked/');
            return response.data;
        },
        staleTime: 1000 * 60 * 2
    });

    // if (isLoading) return <span> Cargando Articulos Likeados... </span> ;
    // if (error) return <span> Error cargando Articulos Likeados </span> ;

    return (
        <div className="liked-products" style={{ position: "sticky" }}>
            <Accordion variant="splitted">
                <AccordionItem key="1" title={
                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        Articulos Favoritos
                    </div>
                }>
                    <ProductsScript products={likedProducts} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}