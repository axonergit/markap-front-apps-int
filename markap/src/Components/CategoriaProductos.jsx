import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import MyNavbar from "./Navbar.jsx";
import Stars from "./Stars.jsx";
import Pagination from "./Pagination.jsx";
import { useState } from "react";

const CategoriaProductos = () => {
  // Captura el ID de la categoría desde la URL
  const { id, page } = useParams();
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1); // Establece la página inicial desde el parámetro o 1


  // Realiza la consulta para obtener los datos de la categoría, incluyendo la página actual
  const { isLoading, error, data } = useQuery({
    queryKey: ['categoria', id, currentPage],
    queryFn: () =>
      axiosClient
        .get(`/productos/categoria/${id}?page=${currentPage}`)
        .then((res) => res.data),
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

          {data.content && data.content.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {data.content.map((producto) => (
                <li key={producto.id} className="bg-gray-100 p-4 rounded-lg shadow-md h-full">
                  <h2 className="text-xl md:text-lg font-bold">{producto.descripcion}</h2>
                  <img src={producto.imagen} className="w-full h-auto object-contain" alt="Producto"></img>
                  <p className="overflow-hidden text-ellipsis">{producto.detalles}</p>
                  <Stars id={producto.id} />
                  <p className="font-bold text-green-500">Precio: ${producto.precio.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
          
          <div className="py-10">
            <Pagination 
              categoryId={id} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} // Pasa el manejador de cambio de página
              maxVisiblePages={data.totalPages}
              totalPages={data.totalPages}
            />
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default CategoriaProductos;
