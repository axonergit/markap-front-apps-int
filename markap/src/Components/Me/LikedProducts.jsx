import { useQuery } from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";
import ArrayProducts from "./ArrayProducts.jsx";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function LikedProducts() {

    const {data: likedProducts ,isLoading, error } = useQuery({
        queryKey: ['Likeados'],
        queryFn: async () => {
            const response = await axiosClient.get('/productos/liked/');
            return response.data;
        }
    });

    // if (isLoading) return <span> Cargando Articulos Likeados... </span> ;
    // if (error) return <span> Error cargando Articulos Likeados </span> ;

    return (
        <div className="liked-products text-neutral" style={{ position: "sticky" }}>
            <Accordion variant="splitted">
                <AccordionItem className="border-3 border-base-300 bg-neutral-content rounded-2xl" key="1" title={
                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        Articulos Favoritos
                    </div>
                }>
                    <ArrayProducts productosResponse={likedProducts} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}