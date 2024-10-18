import axiosClient from "../config/axiosClient.js";
import {useEffect, useState} from "react";
import Navbar from "../Components/Navbar.jsx";
import SideMe from "../Components/SideMe.jsx";
import MeItem from "../Components/MeItem.jsx";

const Me = () => {
    const [datosUsuario, setDatosUsuario] = useState({});

    const opciones = [{
        id: 1,
        titulo: "Mis compras",
        detalles: "Aqui puedes encontrar un detalle de todas tus compras pasadas."
    }, {
        id: 2,
        titulo: "Mi carrito",
        detalles: "Aqui puedes encontrar un detalle de los elementos en tu carrito."
    }, {
        id: 3,
        titulo: "Mi cuenta",
        detalles: "Aqui puedes cambiar detalles de tu cuenta."}
    ]


    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const response = await axiosClient.get("/users/me");
                setDatosUsuario(response.data);
            } catch (error) {
                console.error("Error al obtener los datos del usuario", error);
            }
        };

        obtenerUsuario();
    }, []); // [] para ejecutar el efecto solo cuando el componente se monta

    return (
        <>
            <Navbar/>
            <div className="flex">
                <SideMe/>
                <div
                    className="flex-grow flex  h-screen bg-white shadow p-4">

                </div>
            </div>
        </>
    );
};

export default Me;
