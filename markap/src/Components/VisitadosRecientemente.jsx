import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from '../context/AuthContext.jsx'; 
import { Link } from "react-router-dom"; 

// usar UseContext para mostrar algun texto como "Tenes que estar logueado para ver productos recientemente visitados"

export default function VisitadosRecientemente() {

  const { isAuthenticated } = useContext(AuthContext);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      className: "center",
      centerMode: true,
      centerPadding: "10px",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dots: true,
          }
        }
      ]
    };
  
    const { isLoading, error, data } = useQuery({
      queryKey: ['Visitados'],
      queryFn: () => axiosClient.get("/productos/visited/0").then(res => res.data),
      enabled: isAuthenticated,
    });
  

    if (!isAuthenticated) {
      return <p className="text-center text-white">Tenés que estar logueado para ver productos recientemente visitados. <Link to="/login" className="text-blue-500 underline">Iniciar sesión</Link></p>;
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error cargando productos visitados recientemente</div>;
  
    return (
<>
    <div className="w-full h-1/2 flex items-center justify-center py-14">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg py-5">
        <p className="text-lg mb-4">{"Productos de la categoría"}</p>

        {data && data.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.slice(0, 5).map((producto) => (
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
                <p className="font-bold text-green-500 text-lg">
                  Precio: ${producto.precio}
                </p>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
</>

    );
}
