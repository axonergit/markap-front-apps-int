import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient.js";
import ModificarProducto from "./ModificarProducto.jsx";
import VerImagenProducto from "./VerImagenProducto.jsx";
import CrearProducto from "./CrearProducto.jsx";
import { toast } from "react-hot-toast";

const TablaProductos = () => {
    const queryClient = useQueryClient();

    const { isLoading, error, data: productos } = useQuery({
        queryKey: ['Productos'],
        queryFn: () => axiosClient.get("/productos").then((res) => res.data),
    });

    const eliminarProductoMutation = useMutation({
        mutationFn: (id) => axiosClient.delete(`/productos/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['Productos']);
            toast.success('Producto eliminado exitosamente');
        },
        onError: (error) => {
            console.error("Error al eliminar el producto:", error);
            toast.error("Error al eliminar el producto. Intente nuevamente.");
        },
        retry: 3, // Retry up to 3 times
    });

    const EliminarProducto = async (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            eliminarProductoMutation.mutate(id);
        }
    }

    if (isLoading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    if (error) return <div className="text-error text-center">Error cargando productos: {error.message}</div>;

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <CrearProducto />
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre producto</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productos?.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.detalles}</td>
                                <td>{producto.nombreCategoria}</td>
                                <td>${producto.precio.toFixed(2)}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <VerImagenProducto producto={producto} />
                                        <ModificarProducto
                                            producto={producto}
                                            onClose={() => queryClient.invalidateQueries(['Productos'])}
                                        />
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => EliminarProducto(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between w-full mt-4">
                    <p>Total de productos: {productos?.length || 0}</p>
                </div>
            </div>
        </div>
    )
}

export default TablaProductos;