import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import MyNavbar from "../Components/Navbar.jsx";
import Pagination from "../Components/Pagination.jsx";
import PaginaError from "../Components/PaginaError.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const CategoriaProductos = () => {
 
  const navigate = useNavigate(); // Crear la instancia de navigate

  const { id, page } = useParams();
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page - 1) : 0); // Establece la página inicial desde el parámetro 0

  useEffect(() => {
    document.title = "Markap - Producto Categorias";
  }, []);


  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['categoria', id, currentPage],
    queryFn: () =>
      axiosClient
        .get(`/productos/categoria/${id}?page=${currentPage}`)
        .then((res) => res.data),
  });


  if (isLoading) return (
    <>
    <MyNavbar/>
    <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ball loading-lg"></span>
    </div>
    </>
  );

  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen text-red-500  mt-2">
        <p>Error cargando productos de la categoría</p>
        <button 
            onClick={() => refetch()}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-neutral-content font-bold py-2 px-4 rounded"
        >
            Reintentar
        </button>

        <button 
            onClick={() => navigate("/")}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-neutral-content font-bold py-2 px-4 rounded"
        >
            Volver a Home
        </button>
    </div>
);

  return (

    <>
    <div>
      <MyNavbar />
      <div className="w-full min-h-screen flex items-center justify-center py-14 text-neutral">
        <div className="w-full max-w-6xl bg-neutral-content p-6 rounded-lg shadow-lg py-5">
          <p className="text-lg mb-4"> Productos de la categoría</p>

          {data.content && data.content.length > 0 ? (
           <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           {data.content.map((producto) => (
               <Link
                   to={`/producto/${producto.id}`}
                   key={producto.id}
               >
                 <Card
                     className="border-2 border-base-300 bg-neutral-content"
                     shadow="sm"
                 >
                   <CardBody className="overflow-visible p-0">
                     <Image
                         shadow="sm"
                         alt={producto.id}
                         width="100%"
                         className="w-full object-contain h-[200px] border-1 border-base-300 bg-neutral-content"
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
          )
        }
          
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

export default CategoriaProductos;
