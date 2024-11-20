import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import MyNavbar from "../Components/Navbar.jsx";
import Pagination from "../Components/Pagination.jsx";
import PaginaError from "../Components/PaginaError.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const BusquedaProductos = () => {

  const navigate = useNavigate(); // Crear la instancia de navigate

  const { nombre } = useParams();
  const [currentPage, setCurrentPage] = useState(0); // Maneja la paginación

  useEffect(() => {
    document.title = `Markap - Resultados para "${nombre}"`;
  }, [nombre]);

  const { isLoading, error, data, refetch} = useQuery({
    queryKey: ['buscarProductos', nombre, currentPage],
    queryFn: () =>
      axiosClient.post('/productos/search', {
        nombre: nombre  
      }, {
        params: { page: currentPage, size: 10 }  
      }).then(res => res.data),
      retry:0,
});


  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ball loading-lg"></span>
    </div>);

  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen text-red-500  mt-2">
        <p>Error cargando productos destacados</p>
        <button 
            onClick={() => refetch()}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Reintentar
        </button>

        <button 
            onClick={() => navigate("/")}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Volver a Home
        </button>
    </div>
);

  return (
    <div>
      <MyNavbar />
      <div className="w-full min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center py-14">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg py-5">
          <p className="text-lg mb-4">Resultados para: "{nombre}"</p>

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
            <p>No se encontraron productos para "{nombre}".</p>
          )}

          <div className="py-10">
            <Pagination
              currentPage={currentPage + 1}
              onPageChange={(page) => setCurrentPage(page - 1)}
              totalPages={data.totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusquedaProductos;
