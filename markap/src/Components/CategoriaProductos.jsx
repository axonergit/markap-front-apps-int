import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import MyNavbar from "./Navbar.jsx";
import Stars from "./Stars.jsx";
import Pagination from "./Pagination.jsx";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import PaginaError from "./PaginaError.jsx";

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

  if (error) {
    // Extrae detalles del error si están disponibles
    const errorMessage = error.response?.data?.message || "Error cargando los productos de la categoría."; 
    const statusCode = error.response?.status;
    
    if(errorMessage != 500) { // rari
      return <PaginaError statusCode={statusCode} message={errorMessage} />;
    }
    
    else {
      return <PaginaError statusCode={""} message={errorMessage} />;
    }
  }

  return (

    <>
    <div>
      <MyNavbar />
      <div className="w-full min-h-screen bg-gradient-to-l from-amber-400 to-red-300 flex items-center justify-center py-14">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg py-5">
          <p className="text-lg mb-4">{"Productos de la categoría"}</p>

          {data.content && data.content.length > 0 ? (
           <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           {data.content.map((producto) => (
             <Link 
               to={`/producto/${producto.id}`} 
               key={producto.id} 
               className="bg-gray-100 p-4 rounded-lg shadow-md h-full flex flex-col items-center justify-between"
             >
               <h2 className="text-lg font-semibold text-center mb-2 truncate-multiline">
                 {producto.descripcion}
               </h2>
               <img 
                 src={producto.imagen} 
                 className="w-full h-48 object-contain mb-3" 
                 alt="Producto"
               />
               <p className="text-sm text-gray-600 mb-2 text-center h-10 overflow-hidden">
                 {producto.detalles}
               </p>
               <p className="font-bold text-green-500 text-lg">Precio: ${producto.precio.toFixed(2)}</p>
             </Link>
           ))}
         </ul>
         
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
          
          <div className="py-10">
            <Pagination 
              categoryId={id} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage}
              totalPages={data.totalPages}
            />
          </div>
          
        </div>
      </div>
    </div>
    </>
    
  );
};

export default CategoriaProductos;
