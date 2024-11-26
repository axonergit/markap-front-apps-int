import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link } from "react-router-dom";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

// usar UseContext para mostrar algun texto como "Tenes que estar logueado para ver productos recientemente visitados"

export default function VisitadosRecientemente() {

  const { isAuthenticated } = useContext(AuthContext);

  //ver si usar
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
  
    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['Visitados'],
      queryFn: () => axiosClient.get("/productos/visited/0").then(res => res.data),
      enabled: isAuthenticated,
      retry: 1,
    });
  

    if (!isAuthenticated) {
      return <></>
    }

    if (isLoading) return     (
      <div className="flex justify-center items-center">
          <span className="loading loading-ball loading-lg"></span>
      </div>);

    if (error) return (
      <div className="text-red-500 text-center mt-2">
          <p>Error cargando productos visitados recientemente</p>
          <button 
              onClick={() => refetch()}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-neutral-content font-bold py-2 px-4 rounded"
          >
              Reintentar
          </button>
      </div>
  );



  console.log(data)


    return (
<div className= "h-full flex justify-center items-center text-neutral">
    <div className="w-full h-1/2 flex items-center justify-center py-14">
      <div className="w-full max-w-6xl bg-neutral-content p-6 rounded-lg shadow-lg py-5">
        <p className="text-lg mb-4">{"Ultimos productos visitados"}</p>

        {data && data.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((producto) => (
              <Link
                to={`/producto/${producto.productEntity.id}`}
                key={producto.productEntity.id}
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
                        src={"data:image/png;base64, " + producto.productEntity.imagen}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    {producto.productEntity.descripcion}
                  </CardFooter>
                </Card>
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
