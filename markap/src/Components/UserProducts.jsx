import axiosClient from "../config/axiosClient.js";
import { useQuery } from '@tanstack/react-query';
import {Accordion, AccordionItem} from '@nextui-org/react';
import ScriptProductsProfile from "./ScriptProductsProfile.jsx";

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
            <Accordion variant="shadow">
                <AccordionItem key="1" title="Articulos en Venta">
                    <ScriptProductsProfile products={userProducts} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}