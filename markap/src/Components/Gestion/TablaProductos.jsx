import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient.js";
import ModificarProducto from "./ModificarProducto.jsx";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import CrearProducto from "./CrearProducto.jsx";
import { toast } from "react-hot-toast";

const TablaProductos = () => {
    const queryClient = useQueryClient();

    const { isLoading, error, data: productos } = useQuery({
        queryKey: ['Productos'],
        queryFn: () => axiosClient.get("/productos").then((res) => res.data),
    });


    const EliminarProducto = async (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            try {
                await axiosClient.delete(`/productos/${id}`);
                queryClient.invalidateQueries(['Productos']);
                toast.success('Producto eliminado exitosamente');
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                toast.error("Error al eliminar el producto");
            }
        }
    }

    if (isLoading) return <Spinner label="Cargando productos..." />;
    if (error) return <div className="text-red-500">Error cargando productos: {error.message}</div>;

    return (
        <Card className="w-full px-8 relative z-0">
            <CardHeader className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Productos</h1>
                <CrearProducto />
            </CardHeader>
            <CardBody>
                <Table aria-label="Tabla de productos" className="w-full">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Nombre producto</TableColumn>
                        <TableColumn>Descripción</TableColumn>
                        <TableColumn>Categoría</TableColumn>
                        <TableColumn>Precio</TableColumn>
                        <TableColumn>Stock</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="No hay productos para mostrar.">
                        {productos?.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.id}</TableCell>
                                <TableCell>{producto.descripcion}</TableCell>
                                <TableCell>{producto.detalles}</TableCell>
                                <TableCell>{producto.nombreCategoria}</TableCell>
                                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                                <TableCell>{producto.stock}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <ModificarProducto
                                            producto={producto}
                                            onClose={() => queryClient.invalidateQueries(['Productos'])}
                                            size="sm"
                                            className="w-[90px]"
                                        />
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => EliminarProducto(producto.id)}
                                            className="w-[90px]"
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
            <CardFooter>
                <div className="flex justify-between w-full">
                    <p>Total de productos: {productos?.length || 0}</p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TablaProductos;