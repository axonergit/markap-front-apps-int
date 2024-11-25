import {useQuery} from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {Image} from "@nextui-org/react";


export default function Destacados() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ['Destacados'],
        queryFn: () =>
            axiosClient.get("/productos/destacados").then((res) => res.data),
        retry: 1,
    });

   
    useEffect(() => {

        if (data) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }, 1000 * 5);
    
            return () => clearInterval(interval);
        }
    }, [data]);

  
     if (isLoading) return     (
        <div className="flex justify-center items-center">
            <span className="loading loading-ball loading-lg"></span>
        </div>);

    if (error) return (
        <div className="text-red-500 text-center mt-2">
            <p>Error cargando productos destacados</p>
            <button 
                onClick={() => refetch()}
                className="mt-2 bg-base-100 hover:bg-base-200 text-neutral font-bold py-2 px-4 rounded"
            >
                Reintentar
            </button>
        </div>
    );
  

    return (
        <div className="w-full flex flex-col items-center pt-4 pb-8 ">
            <h1 className="text-3xl font-bold text-accent-content mb-5 py-5">
                Productos Destacados del Mes
            </h1>

            <div className="carousel rounded-box w-full h-full">
                {data?.map((producto, index) => (
                    <div
                        key={producto.id}
                        className={`carousel-item flex flex-col items-center w-full h-full pt-0 pb-0 ${
                            index === currentIndex ? "block" : "hidden"
                        }`}
                    >
                    <div className='group transition-colors duration-300 hover:bg-base-300 hover:text-accent-content'>
                    <Link to={`/producto/${producto.id}`} className="">
                        <div className="p-0 flex flex-col">
                            <Image className="object-contain h-[500px] w-[500px] bg-neutral-content rounded-t-lg rounded-b-none"
                                   src={producto.imagen} alt={producto.nombre}>
                            </Image>
                            <p className="p-6 bg-neutral-content
                                rounded-b-lg text-center text-neutral font-bold text-2xl shadow-md">
                                {producto.descripcion}
                            </p>
                        </div>
                    </Link>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
