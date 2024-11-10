import {useQuery} from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import ModificarProducto from "./ModificarProducto.jsx";
import {Button} from "@nextui-org/react";

const TablaProductos = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['Productos'],
        queryFn: () =>
            axiosClient.get("/productos").then((res) => res.data),
    });

    if (isLoading) return 'Loading...';
    if (error) return 'Error cargando productos';

    console.log(data);

    const EliminarProducto = (id) => {
        axiosClient.delete("/productos/"+id).then((res) => {
            //agregar para refrescar la pagina
            console.log(res)});
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                <tr>
                    <th></th>
                    <th>Nombre producto</th>
                    <th>Descripcion</th>
                    <th>Categoria</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((producto) => (
                    <tr key={producto.id}>
                        <th>{producto.id}</th>
                        <td>{producto.descripcion}</td>
                        <td>{producto.detalles}</td>
                        <td>{producto.nombreCategoria}</td>
                        <td>{producto.precio}</td>
                        <td>{producto.stock}</td>
                        <td><ModificarProducto></ModificarProducto></td>
                        <td><Button color="danger" onClick={() => EliminarProducto(producto.id)}>Eliminar</Button></td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}

export default TablaProductos;