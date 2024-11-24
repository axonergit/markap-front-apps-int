import axiosClient from "../../config/axiosClient.js";
import { useQuery } from '@tanstack/react-query';
import {Accordion, AccordionItem} from '@nextui-org/react';
import ArrayHistory from "./ArrayHistory.jsx";

export default function HistoryProducts() {

    const {data: comprasHistorial, isLoading, error} = useQuery({
        queryKey: ['Historial'],
        queryFn: async () => {
            const response = await axiosClient.get('/carrito/historial');
            return response.data;
        },
    });

    return (
        <div style={{ position: "relative" }}>
            <Accordion variant="splitted">
                <AccordionItem key="1" className="border-3 border-base-300 bg-white rounded-2xl" title={
                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        Historial de Compras
                    </div>
                }>
                    <ArrayHistory compras={comprasHistorial} />
                </AccordionItem>
            </Accordion>
        </div>
    );
}