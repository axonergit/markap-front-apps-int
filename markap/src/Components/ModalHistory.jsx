import {
    Button, Link,
    Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from "@nextui-org/react";
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

    const totalAmount = itemsHistorial?.content?.reduce((sum, item) => sum + (item.amount * item.product.precio), 0);

    return (
        <Modal
            size="sm"
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Historial</ModalHeader>
                        <ModalBody>
                            {isLoading && <p>Cargando...</p>}
                            {error && <p>Error al cargar los datos</p>}
                            {itemsHistorial && Array.isArray(itemsHistorial.content) ? (
                                <Table aria-label="Tabla de historial de compras">
                                    <TableHeader>
                                        <TableColumn>Articulo</TableColumn>
                                        <TableColumn>Cantidad</TableColumn>
                                        <TableColumn>Monto</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {itemsHistorial.content.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Link href={`../producto/${item.product.id}`}>{item.product.descripcion}</Link>
                                                </TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>${item.amount * item.product.precio}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                !isLoading && <p>No se encontraron detalles.</p>
                            )}
                            <div style={{paddingTop: '.2rem', textAlign: 'center'}}>
                                <h4>Monto Total</h4>
                                <p>${totalAmount?.toFixed(2)}</p>
                            </div>
                        </ModalBody>
                        <ModalFooter style={{ marginTop: "-1rem" }}>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}