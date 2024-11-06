import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function VisitadosRecientemente() {
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
    });
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error cargando productos visitados recientemente</div>;
  
    return (
      <div className="container mx-auto px-4 py-5">
        <Slider {...settings}>
          {data?.map((producto) => (
            <div key={producto.productEntity.id}>
              <img src={producto.productEntity.imagen} alt="Producto"/>
              <h2>{producto.productEntity.descripcion}</h2>
              <p>Precio: ${producto.productEntity.precio}</p>
            </div>
          ))}
        </Slider>

      </div>
    );
}
