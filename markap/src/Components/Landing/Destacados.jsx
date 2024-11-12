import {useQuery} from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";
import { Link } from "react-router-dom"; 

export default function Destacados() {

    const {isLoading, error, data} = useQuery({
        queryKey: ['Destacados'],
        queryFn: () =>
            axiosClient.get("/productos/destacados").then((res) => res.data),
    });

    if (isLoading) return 'Loading...';
    if (error) return 'Error cargando productos destacados';

    return (
        
        <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 flex flex-col items-center py-6">
            <h1 className="text-3xl font-bold text-white mb-5 py-12">Productos Destacados del Mes</h1>
            
            <div className="carousel rounded-box p-10 w-full h-full">
                {data?.map((productoDestacado) => (
                    <div className="carousel-item flex flex-col items-center w-full h-full p-9"
                         key={productoDestacado.id}>
                        <Link to={`/producto/${productoDestacado.id}`}>
                        <img
                            src={productoDestacado.imagen}
                            alt={productoDestacado.nombre}
                            className=" w-full h-1/2 xl:w-96 "  //
                        />
                        <p className="mt-3 p-6 bg-white border border-gray-300 rounded text-center text-2xl">{productoDestacado.descripcion}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}
