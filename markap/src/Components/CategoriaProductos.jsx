import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import MyNavbar from "./Navbar.jsx";
import Stars from "./Stars.jsx";

const CategoriaProductos = () => {
  // Captura el ID de la categoría desde la URL
  const { id } = useParams();

  // Realiza la consulta para obtener los datos de la categoría
  const { isLoading, error, data } = useQuery({
    queryKey: ['categoria'],
    queryFn: () =>
      axiosClient.get(`http://localhost:3000/productos/`).then((res) => res.data),
  });

  // Muestra la UI para los diferentes estados
  if (isLoading) return <p>Cargando productos de la categoría...</p>;
  if (error) return <p>Error cargando los productos de la categoría.</p>;

  return (
    <div>
      <MyNavbar/>
      <div className="w-full min-h-screen bg-gradient-to-l from-amber-400 to-red-300 flex items-center justify-center py-14">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg py-5">
          <p className="text-lg mb-4">{"Productos de la categoría"}</p>

          {/* Ejemplo de listado de productos de la categoría */}
          {data && data.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((producto) => (
                <li key={producto.id} className="bg-gray-100 p-4 rounded-lg shadow-md h-full">
                  {/* Info de la tarjeta por producto */}
                  <h2 className="text-xl md:text-lg font-bold">{producto.descripcion}</h2>
                  <img src={producto.imagen} className="w-full h-48 object-cover" alt="Producto"></img>
                  <p className="overflow-hidden text-ellipsis">{producto.detalles}</p>
                  <Stars id={producto.id} />
                  <p className="font-bold text-green-500">Precio: ${producto.precio.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriaProductos;
