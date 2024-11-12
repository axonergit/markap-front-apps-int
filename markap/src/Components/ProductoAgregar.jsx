import React from "react";
import {Button} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function ProductoAgregar( { productoJson, cantidad, cantidadQuery, setCantidad } ) {

    const maxAmount = productoJson.stock;

    const handleIncremento = () => {
        if (cantidadQuery + cantidad < maxAmount) {
            setCantidad(cantidad + 1);
        }
    };

    const handleDisminuir = () => {
        if (cantidad || cantidadQuery) {
            setCantidad(cantidad - 1)
        }
    };

    return (
        <div style={{display: "flex", alignItems: "center", gap: ""}}>
            <Button variant="ghost"
                style={{
                    fontSize: "1.25rem",
                    borderRadius: "8px 0 0 8px",
                    border: "2px solid #0072F5",
                    borderRight: "none",
                }}
                auto size="md" color="primary" onClick={handleDisminuir} disabled={cantidad === 0}
            >
                -
            </Button>
            <span style={{
                    padding: "0 1.5rem",
                fontSize: "1.53rem",
                border: "2px solid #0072F5",
                borderLeft: "none",
                borderRight: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {cantidad + cantidadQuery}
            </span>
            <Button variant="ghost"
                style={{
                    fontSize: "1.25rem",
                    borderRadius: "0 8px 8px 0",
                    border: "2px solid #0072F5",
                    borderLeft: "none",
                }}
                auto size="md" color="primary" onClick={handleIncremento} disabled={cantidad === maxAmount}
            >
                +
            </Button>
        </div>
    )
}