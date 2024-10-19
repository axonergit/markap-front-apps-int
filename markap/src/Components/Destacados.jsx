import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import shrek from "../assets/shrek.jpg"; 
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient";

export default function Destacados() {
  const sliderRef = useRef(null); // Use ref to target the slider

  useEffect(() => {
    if (sliderRef.current) {
      const slider = new Glide(sliderRef.current, {
        type: "carousel",
        focusAt: "center",
        perView: 3,
        autoplay: 3000,
        animationDuration: 700,
        gap: 24,
        classNames: {
          nav: {
            active: "[&>*]:bg-wuiSlate-700",
          },
        },
        breakpoints: {
          1024: {
            perView: 2,
          },
          640: {
            perView: 1,
          },
        },
      }).mount();

      return () => {
        slider.destroy();
      };
    }
  }, []);

  const { isLoading, error, data } = useQuery({   //Usamos useQuery con la ruta del backend (tomamos los destacados)
    queryKey: ['Destacados'],
    queryFn: () =>
      axiosClient.get("/productos/destacados").then((res) => res.data),
  });

  if (isLoading) return 'Loading...';

  console.log(data)

  return (
    <>
      {/*<!-- Component: Card Carousel --> */}
      <div ref={sliderRef} className="glide-06 relative w-5/6 h-1/4 sm:w-3/6 sm:h-1/8  overflow-hidden rounded bg-white shadow-xl shadow-slate-200 m-16">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {data.map((producto) => (
              <li key={producto.id}>{producto.descripcion} {producto.precio} <img src={producto.imagen} height="200" alt=""/></li>
            ))}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      {/*<!-- End Card Carousel --> */}
    </>
  );
}
