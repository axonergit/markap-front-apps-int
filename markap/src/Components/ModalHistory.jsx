import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient.js";

// eslint-disable-next-line react/prop-types
export default function ModalHistory({ isOpen, onClose, carritoId }) {

    const {data: itemsHistorial, isLoading, error} = useQuery({
        queryKey: ['ItemsHistorial', carritoId],
        queryFn: async () => {
            const response = await axiosClient.get(`/carrito/historial/${carritoId}`);
            console.log(response.data);
            return response.data;
        },
        staleTime: 1000 * 60 * 2,
        enabled: isOpen && !!carritoId
    });

    return (
        <Modal
            size="xs"
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Historial</ModalHeader>
                        <ModalBody>
                            {error && <p>Error al cargar los datos</p>}
                            {itemsHistorial && Array.isArray(itemsHistorial.content) ? (
                                itemsHistorial.content.map((item, index) => (
                                    <div key={index} style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                        <p>{item.product.descripcion} - {item.amount}
                                            $ {item.amount * item.product.precio}</p>
                                    </div>
                                ))
                            ) : (
                                !isLoading && <p>No se encontraron detalles.</p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}