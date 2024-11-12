import axiosClient from "../config/axiosClient.js";
import { useQuery } from '@tanstack/react-query';
import {Accordion, AccordionItem} from '@nextui-org/react';
import HistoryScript from "./HistoryScript.jsx";

export default function HistoryProducts() {

    const {data: comprasHistorial, isLoading, error} = useQuery({
        queryKey: ['Historial'],
        queryFn: async () => {
            const response = await axiosClient.get('/carrito/historial');
            return response.data;
        },
    });

    return (
        <div className="history-products" style={{ position: "relative" }}>
            <Accordion variant="splitted">
                <AccordionItem key="1" className="bg-neutral-content" title={
                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        Historial de Compras
                    </div>
                }>
                    <HistoryScript compras={comprasHistorial} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}