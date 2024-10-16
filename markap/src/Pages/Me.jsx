import axiosClient from "../config/axiosClient.js";
import { useState, useEffect } from "react";

const Me = () => {
    const [datosUsuario, setDatosUsuario] = useState({});

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
        <div>
            <h1>Hola, estamos en el perfil del usuario</h1>
            <pre>{JSON.stringify(datosUsuario, null, 2)}</pre>
        </div>
    );
};

export default Me;
