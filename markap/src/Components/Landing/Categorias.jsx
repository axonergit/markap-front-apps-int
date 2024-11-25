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
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-neutral-content font-bold py-2 px-4 rounded"
            >
                Reintentar
            </button>
        </div>
    );

    console.log(data)

    return (
        <div className="w-full flex items-center justify-around p-10 ">
            <ul className="w-11/12 max-w-6xl h-full grid gap-10  md:grid-cols-2 lg:grid-cols-4">
                {data?.map((categoria) => (
                    <div className="text-neutral bg-neutral-content rounded-md transition-colors duration-300 hover:bg-base-300 hover:text-accent-content w-[15rem] h-[7rem]">
                        <Link key={categoria.id} to={`/productos/categoria/${categoria.id}`}
                            className=" shadow-md w-full h-full flex items-center justify-center ">
                            <li className="text-center p-4 flex items-center justify-center ">
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

