import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";

const CategoriaProductos = () => {
  // Captura el ID de la categoría desde la URL
  const { id } = useParams();

    // Convertir id a número y verificar si es un número válido
    const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
        return <p>ID inválido.</p>;
    }



  // Realiza la consulta para obtener los datos de la categoría
  const { isLoading, error, data } = useQuery({
    queryKey: ['categoria', numericId],
    queryFn: () =>
      axiosClient.get("/productos/categoria/${numericId}").then((res) => res.data),
  });



  // Muestra la UI para los diferentes estados
  if (isLoading) return <p>Cargando productos de la categoría...</p>;
  if (error) return <p>Error cargando los productos de la categoría.</p>;

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-amber-400 to-red-300 flex items-center justify-center">
      <div className="w-11/12 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{data.id_categoria}</h1>
        <p className="text-lg mb-4">{/* data.descripcionCategoria */ "JAJAJAJ"}</p>

        {/* Ejemplo de listado de productos de la categoría */}
        {data.productos && data.productos.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.productos.map((producto) => (
              <li key={producto.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">{producto.descripcion}</h2>
                <p>{producto.descripcion}</p>
                <p className="font-bold text-green-500">Precio: ${producto.precio}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriaProductos;
