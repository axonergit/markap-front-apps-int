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
                className="mt-2 bg-accent text-neutral-content font-bold py-2 px-4 rounded"
            >
                Reintentar
            </button>
        </div>
    );

    console.log(data)

    return (
        <div className="flex items-center justify-center p-10">
            <ul className="w-11/12 max-w-6xl grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.map((categoria) => (
                    <div key={categoria.id} className="text-neutral bg-neutral-content rounded-md transition-colors duration-300 hover:bg-base-300 hover:text-accent-content w-[15rem] h-[7rem] flex items-center justify-center shadow-md">
                        <Link  to={`/productos/categoria/${categoria.id}`}
                            className=" shadow-md w-full h-full flex items-center justify-center ">
                            <li className="text-center p-4 ">
                                <span className="text-2xl font-bold font-sans">
                                    {categoria.nombreCategoria}
                                </span>
                            </li>
                        </Link>
                    </div>
                ))}
            </ul>
        </div>

    )
}

export default Categorias;

{/*  */
}

