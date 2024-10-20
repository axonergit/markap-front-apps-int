import MyNavbar from "../Components/Navbar.jsx";
import { Button, ButtonGroup } from "@nextui-org/button";
import axiosClient from "../config/axiosClient.js";
import { useQuery } from '@tanstack/react-query';
import IndividualCard from "../Components/individualCard.jsx";
import Destacados from "../Components/Destacados.jsx";
import React from 'react';
import Footer from "../Components/Footer.jsx";

const Landing = () => {
    const token = localStorage.getItem("authToken");

    const { isLoading, error, data } = useQuery({   
        queryKey: ['Categorias'],
        queryFn: () =>
          axiosClient.get("http://localhost:3000/categorias").then((res) => res.data),
      });
    
    if (isLoading) return 'Loading...';
    if (error) return 'Error cargando categorías';

    return (
        <>
            <MyNavbar />
            {/* Div para productos destacados */}
            <div className="w-screen h-1/3 bg-gradient-to-l from-blue-950 to-blue-500 flex justify-center items-center">
                <Destacados />
            </div>

            {/* Sección de las categorías */}
            <div className="w-screen h-screen bg-gradient-to-l from-amber-400 to-red-300 flex flex-wrap justify-center space-x-4 space-y-4">
                {data.map((categoria) => (
                    <ul>

                        <IndividualCard data={categoria} />

                    </ul>
                    
                ))}
            </div>

            <div>

                <Footer></Footer>

            </div>

            {token ? <h1>Logeado gil</h1> : <h1>No logeado gil</h1>} 
        </>
    )
}

export default Landing;
