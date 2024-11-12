import { Image } from "@nextui-org/react";
import React from "react";

{/* eslint-disable-next-line no-undef */}
export default function ProductoImage( {productoJson: productoJson} ) {
    return (
        <Image
            style={{
                backgroundColor: "white",
                borderRadius: "8px",
            }}
            shadow="none"
            alt={productoJson.id}
            className="object-contain h-[500px] w-[500px]"
            src={productoJson.imagen}
        />
    )
}