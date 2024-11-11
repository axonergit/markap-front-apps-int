import React from "react";
import {Chip} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function ProductoInfo( { productoJson } ) {
    return (
        <>
            <h1 style={{fontSize: "2.5rem", fontWeight: "bold"}}>{productoJson.descripcion}</h1>
            <p style={{width: '25rem'}}>
                {productoJson.detalles}
            </p>
            <h2> $ {productoJson.precio}</h2>
            <h2>Categoria: <Chip>{productoJson.nombreCategoria}</Chip></h2>

        </>
    )
}