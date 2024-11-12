import {useQuery} from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient.js";
import {Link} from "react-router-dom";

const Categorias = () => {

    const {isLoading, error, data} = useQuery({
        queryKey: ['Categorias'],
        queryFn: () =>
            axiosClient.get("/productos/categoria").then((res) => res.data),
    });

    if (isLoading) return 'Loading...';
    if (error) return 'Error cargando categorías';

    console.log(data)

    return (
        <div className="w-full h-2/3 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center ">
            <ul className="w-11/12 max-w-6xl h-full grid gap-10 p-10 md:grid-cols-2 lg:grid-cols-4">
                {data?.map((categoria) => (
                    <Link key={categoria.id} to={`/productos/categoria/${categoria.id}`}
                          className="rounded-sm shadow-md bg-white w-full h-full flex items-center justify-center">
                        <li className="text-center p-4 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300">
                            <span className="text-2xl font-bold text-gray-800 font-sans">
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

