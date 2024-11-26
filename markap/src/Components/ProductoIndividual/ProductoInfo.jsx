import React from "react";
import {Chip , Link} from "@nextui-org/react";
import {useQuery} from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient.js";

// eslint-disable-next-line react/prop-types
export default function ProductoInfo( { productoJson } ) {

    const {data: CategoriaProducto, isLoading, error} = useQuery({
        queryKey: ['Categoria'],
        queryFn: async () => {
            const response = await axiosClient.get("productos/categoria");
            return response.data;
        },
        enabled: !!productoJson
    })

    const matchedCategoria = CategoriaProducto?.find(
        (categoria) => categoria.nombreCategoria === productoJson.nombreCategoria
    );

    return (
        <div className="bg-neutral-content border-3 border-base-content text-neutral"
             style={{padding: "1em", width: "30rem", height: "auto",borderRadius: "8px"}}>
            <h1 style={{fontSize: "2.5rem", fontWeight: "bold"}}>{productoJson.descripcion}</h1>
            <p style={{width: '25rem'}}>
                {productoJson.detalles}
            </p>
            <h2 style={{fontSize: "1.6rem", fontWeight: "bold"}}> $ {productoJson.precio}</h2>
            <h2 style={{fontSize: "1rem", fontWeight: "bold"}}>
                Categoria: <Chip color="primary" variant="bordered">
                <Link href={CategoriaProducto && "../productos/categoria/"+matchedCategoria.id}>
                {productoJson.nombreCategoria}
                </Link>
                </Chip>
            </h2>
            <h6 style={{fontSize: ".8rem", fontWeight: "bold"}}>Vendedor: <Link>{productoJson.nombreUserVendedor}</Link></h6>
            <h6 style={{fontSize: ".8rem", fontWeight: "bold"}}>Stock: {productoJson.stock}</h6>
        </div>
    )
}