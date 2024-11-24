import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import MyNavbar from "../Components/Navbar.jsx";
import Pagination from "../Components/Pagination.jsx";
import PaginaError from "../Components/PaginaError.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BusquedaProductos = () => {
  const { nombre } = useParams();
  const [currentPage, setCurrentPage] = useState(0); // Maneja la paginación

  useEffect(() => {
    document.title = `Markap - Resultados para "${nombre}"`;
  }, [nombre]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['buscarProductos', nombre, currentPage],
    queryFn: () =>
      axiosClient.post('/productos/search', {
        nombre: nombre  
      }, {
        params: { page: currentPage, size: 10 }  
      }).then(res => res.data),
});


  if (isLoading) return <p>Cargando productos buscados...</p>;

  if (error) {
    const errorMessage = error.response?.data?.message || "Error encontrando productos relacionados.";
    const statusCode = error.response?.status;

    return <PaginaError statusCode={statusCode} message={errorMessage} />;
  }

  return (
    <>
    <div>
      <MyNavbar />
      <div className="w-full min-h-screen flex items-center justify-center py-14">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg py-5">
          <p className="text-lg mb-4">{"Gestion de la categoría"}</p>

          {data.content && data.content.length > 0 ? (
           <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           {data.content.map((producto) => (
               <Link
                   to={`/producto/${producto.id}`}
                   key={producto.id}
               >
                 <Card
                     className="border-2 border-base-300 bg-white"
                     shadow="sm"
                 >
                   <CardBody className="overflow-visible p-0">
                     <Image
                         shadow="sm"
                         alt={producto.id}
                         width="100%"
                         className="w-full object-contain h-[200px] border-1 border-base-300 bg-white"
                         src={producto.imagen}
                     />
                   </CardBody>
                   <p className="text-center mt-2">{producto.descripcion}</p>
                   <CardFooter className="justify-center">
                     <p className="font-bold">${producto.precio.toFixed(2)}</p>
                   </CardFooter>
                 </Card>
               </Link>
           ))}
           </ul>

          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
          
          <div className="py-10">
            <Pagination 
              categoryId={id} 
              currentPage={currentPage + 1} 
              onPageChange={(page) => setCurrentPage(page - 1)}
              totalPages={data.totalPages}
            />
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default BusquedaProductos;
