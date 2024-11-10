import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";
import ScriptProductsProfile from "./ScriptProductsProfile.jsx";
import {Accordion, AccordionItem} from "@nextui-org/react";

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
            <Accordion variant="splitted">
                <AccordionItem key="1" title="Productos Favoritos">
                    <ScriptProductsProfile products={likedProducts} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}