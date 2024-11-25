import { Image } from "@nextui-org/react";
import React from "react";

{/* eslint-disable-next-line no-undef */}
export default function ProductoImage( {productoJson: productoJson} ) {
    return (
        <Image
            style={{
                backgroundColor: "neutral-content",
                borderRadius: "8px",
            }}
            shadow="none"
            alt={productoJson.id}
            className="object-contain h-[500px] w-[500px] border-4 border-base-content"
            src={productoJson.imagen}
        />
    )
}