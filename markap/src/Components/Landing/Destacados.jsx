import {useQuery} from '@tanstack/react-query';
import axiosClient from "../../config/axiosClient.js";

export default function Destacados() {

    const {isLoading, error, data} = useQuery({
        queryKey: ['Destacados'],
        queryFn: () =>
            axiosClient.get("/productos/destacados").then((res) => res.data),
    });

    if (isLoading) return 'Loading...';
    if (error) return 'Error cargando productos destacados';

    return (
        <div className="w-full md:h-1/2 bg-gradient-to-r from-slate-900 to-slate-800 flex justify-center items-center ">
            <div className="carousel rounded-box p-10 w-full h-full">
                {data?.map((productoDestacado) => (
                    <div className="carousel-item flex flex-col items-center w-full h-full p-9"
                         key={productoDestacado.id}>
                        <img
                            src={productoDestacado.imagen}
                            alt={productoDestacado.nombre}
                            className=" w-full h-1/2 md:w-1/2 lg:w-1/2 xl:w-96 "  //
                        />
                        <h3 className="mt-2 p-2 bg-white border border-gray-300 rounded text-center text-lg w-8/12">{productoDestacado.descripcion}</h3>
                    </div>
                ))}
            </div>
        </div>

    );
}
