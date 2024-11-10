import axiosClient from "../config/axiosClient.js";
import { useState, useEffect } from "react";
import TablaProductos from "../Components/TablaProductos.jsx";
import MyNavbar from "../Components/Navbar.jsx";
import CrearProducto from "../Components/CrearProducto.jsx";

const Productos = () => {
    return (
        <div className="flex flex-col">
            <MyNavbar>
            </MyNavbar>

            <div className="flex-1 flex flex-col gap-32 px-32 py-16">
            <CrearProducto/>
            <TablaProductos/>
            </div>


        </div>

    )
}

export default Productos;