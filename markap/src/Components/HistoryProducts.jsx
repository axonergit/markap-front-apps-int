import axiosClient from "../config/axiosClient.js";
import { useQuery } from '@tanstack/react-query';
import {Accordion, AccordionItem} from '@nextui-org/react';
import ScriptProductsProfile from "./ScriptProductsProfile.jsx";

export default function HistoryProducts() {

    const {data: historyProducts, error, isLoading} = useQuery({
        queryKey: ['historyProducts'],
        queryFn: async () => {
            const response = await axiosClient.get('/products/me');
            return response.data;
        },
        staleTime: 1000 * 60 * 2
    });

    // if (isLoading) return <span> Cargando Historial de Articulos... </span>;
    // if (error) return <span> Error al Cargar Historial de Articulos </span>

    return (
        <div className="user-products">
            <Accordion variant="splitted">
                <AccordionItem key="1" title="Historial de Compras">
                    <ScriptProductsProfile products={historyProducts} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}