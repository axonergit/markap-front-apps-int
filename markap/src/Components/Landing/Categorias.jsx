import {useQuery} from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient.js";
import {Link} from "react-router-dom";

const Categorias = () => {

    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ['Categorias'],
        queryFn: () =>
            axiosClient.get("/productos/categoria").then((res) => res.data),
        retry: 1,
    });

    if (isLoading) return     (
        <div className="flex justify-center items-center">
            <span className="loading loading-ball loading-lg"></span>
        </div>);

    if (error) return (
        <div className="text-red-500 text-center mt-2">
            <p>Error cargando las categorías existentes</p>
            <button 
                onClick={() => refetch()}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Reintentar
            </button>
        </div>
    );

    return (
            <div className="w-full h-2/3 flex items-center justify-center ">
                <ul className="w-11/12 max-w-6xl h-full grid gap-10 p-10 md:grid-cols-2 lg:grid-cols-4">
                    {data?.map((categoria) => (
                        <Link key={categoria.id} to={`/productos/categoria/${categoria.id}`}
                              className="rounded-md shadow-md bg-white w-[16rem] h-[6rem] flex items-center justify-center">
                            <li className="text-center p-4 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300">
                                <span className="text-2xl font-bold font-sans">
                                    {categoria.nombreCategoria}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

    )
}

export default Categorias;

{/*  */
}

