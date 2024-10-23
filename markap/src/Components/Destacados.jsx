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
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="carousel rounded-box w-8/12 p-16">
      {data.map((productoDestacado) => (
        <div className="carousel-item flex flex-col items-center w-full h-full p-20" key={productoDestacado.id}>
          <img
            src={productoDestacado.imagen}
            alt={productoDestacado.nombre} // It's good practice to have meaningful 'alt' texts
            className="object-cover w-full max-h-80"  // Ajusta el tamaño máximo de la imagen
          />
          <h3 className="mt-2 p-2 bg-white border border-gray-300 rounded text-center text-lg w-11/12">{productoDestacado.descripcion}</h3>
        </div>
      ))}
    </div>
  );
}
