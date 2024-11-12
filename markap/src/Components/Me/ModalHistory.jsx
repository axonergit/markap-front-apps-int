import {
    Button, Link, Pagination,
    Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export default function ModalHistory({ isOpen, onClose, carritoId }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [allCost, setAllCost] = useState(0);
    const pageSize = 5;

    const { data: itemsHistorial, isLoading, error } = useQuery({
        queryKey: ['ItemsHistorial', carritoId, currentPage],
        queryFn: async () => {
            const response = await axiosClient.get(`/carrito/historial/${carritoId}?pagina=${currentPage - 1}&size=${pageSize}`);
            return response.data;
        },
        enabled: isOpen && !!carritoId,
        keepPreviousData: true
    });

    const { data: data, _isLoading, _error } = useQuery({
        queryKey: ['totalCost', carritoId, 1],
        queryFn: async () => {
            const response = await axiosClient.get(`/carrito/historial/${carritoId}?pagina=${currentPage - 1}&size=25`);
            setAllCost(response.data?.content?.reduce((sum, item) => sum + (item.amount * item.product.precio), 0));
        },
        enabled: isOpen && !!carritoId,
        keepPreviousData: true
    });

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
                                                <TableCell>${(item.amount * item.product.precio).toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                !isLoading && <p>No se encontraron detalles.</p>
                            )}
                            <div style={{ paddingTop: '.2rem', textAlign: 'center' }}>
                                <h4>Monto Total</h4>
                                <p>${allCost?.toFixed(2)}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: ".2rem" }}>
                                <Pagination
                                    total={itemsHistorial?.totalPages}
                                    initialPage={currentPage}
                                    onChange={(page) => setCurrentPage(page)}
                                    showControls
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
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