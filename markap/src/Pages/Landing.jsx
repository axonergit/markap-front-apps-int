import MyNavbar from "../Components/Navbar.jsx";
import {Button, ButtonGroup} from "@nextui-org/button";
import axiosClient from "../config/axiosClient.js";
import {useState} from "react";
import Card from "../Components/Card.jsx";
import Destacados from "../Components/Destacados.jsx";
import Categorias from "../Components/Categorias.jsx";
import React from 'react';
import { useQuery } from '@tanstack/react-query';


const Landing = () => {
    const token = localStorage.getItem("authToken");

    const { isLoading, error, data } = useQuery({   //Usamos useQuery con la ruta del backend (tomamos los destacados)
        queryKey: ['Categorias'],
        queryFn: () =>
          axiosClient.get("http://localhost:3000/categorias").then((res) => res.data),
      });
    
      if (isLoading) return 'Loading...';
    
      console.log(data)

    return (
        <>
        <MyNavbar></MyNavbar>
            <div className="w-screen h-screen bg-gradient-to-l from-blue-950 to-blue-500 flex justify-center items-center">
                <Destacados>
            
                </Destacados>
            </div>

            <div className="w-screen h-screen bg-gradient-to-l from-black to-red-800 flex justify-center items-center">

                <Categorias data = {data}>

                

                </Categorias>

            </div>

            <div className="w-screen h-screen bg-gradient-to-l from-black to-red-800 flex justify-center items-center">





            </div>

            

            {token ? <h1>Logeado gil</h1> : <h1>no logeado gil</h1>} { /*<!--esto junto a const token nos sirven para renderizar el historial de productos visitados del usuario cuando se loguea -->*/}
        </>
    )
}

export default Landing
