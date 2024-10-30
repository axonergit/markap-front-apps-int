import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";

export default function Destacados() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['Destacados'],
    queryFn: () =>
      axiosClient.get("/productos/destacados").then((res) => res.data),
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error cargando productos destacados';

  return (
    <div className="carousel rounded-box p-10 w-full h-full">
      {data?.map((productoDestacado) => (
        <div className="carousel-item flex flex-col items-center w-full h-full p-9" key={productoDestacado.id}>
          <img
            src={productoDestacado.imagen}
            alt={productoDestacado.nombre} // It's good practice to have meaningful 'alt' texts
            className=" w-full h-1/2 md:w-1/2 lg:w-1/2 xl:1/2 "  // Ajusta el tamaño máximo de la imagen
          />
          <h3 className="mt-2 p-2 bg-white border border-gray-300 rounded text-center text-lg w-8/12">{productoDestacado.descripcion}</h3>
        </div>
      ))}
    </div>
  );
}
