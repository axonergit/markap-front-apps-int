import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from '../../context/AuthContext.jsx';
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
      return <></>
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error cargando productos visitados recientemente</div>;
  console.log(data)
    return (
<div className= "h-full bg-gradient-to-r from-slate-900 to-slate-800 flex justify-center items-center">
    <div className="w-full h-1/2 flex items-center justify-center py-14">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg py-5">
        <p className="text-lg mb-4">{"Ultimos productos visitados"}</p>

        {data && data.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((producto) => (
              <Link
                to={`/producto/${producto.productEntity.id}`}
                key={producto.productEntity.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md h-full flex flex-col items-center justify-between"
              >
                <h2 className="text-lg font-semibold text-center mb-2 truncate-multiline">
                  {producto.productEntity.descripcion}
                </h2>
                <img
                  src={producto.productEntity.imagen}
                  className="w-full h-48 object-contain mb-3"
                  alt="Producto"
                />
                <p className="text-sm text-gray-600 mb-2 text-center h-10 overflow-hidden">
                  {producto.productEntity.detalles}
                </p>
                <p className="font-bold text-green-500 text-lg">
                  Precio: ${producto.productEntity.precio}
                </p>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No hay productos recientemente visitados.</p>
        )}
      </div>
    </div>
</div>

    );
}
