import {useQuery} from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";
import { Link } from "react-router-dom"; 

const Categorias = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['Categorias'],
        queryFn: () =>
            axiosClient.get("/productos/categoria").then((res) => res.data),
    });

    if (isLoading) return 'Loading...';
    if (error) return 'Error cargando categorías';

    console.log(data)
   
    return (
        <>
        <div className="w-full h-full bg-gradient-to-l from-amber-400 to-red-300 flex items-center justify-center ">
            <ul className="w-11/12 max-w-6xl h-full grid gap-2 p-10 md:grid-cols-2 lg:grid-cols-4">
                {data?.map((categoria) => (
                    <li
                        className="bg-white rounded-lg shadow-md text-center p-4 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                        key={categoria.id}
                    >
                        <Link to={`productos/categoria/${categoria.id}`} className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800 font-sans">
                                {categoria.nombreCategoria}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
        
    )
}

export default Categorias;

 {/*  */}

