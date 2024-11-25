import {Button} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function ProductoCantidad({ productoJson, cantidad, cantidadQuery, setCantidad } ) {

    const maxAmount = productoJson.stock;
    const handleIncremento = () => {
        setCantidad(cantidad + 1);
    };

    const handleDisminuir = () => {
        if (cantidad) {
            setCantidad(cantidad - 1)
        }
    };

    return (
        <div style={{display: "flex", alignItems: "center", paddingLeft: "8vh"}}>
            <Button style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderRadius: "8px 0 0 8px",
                        backgroundColor: "neutral-content",
                    }}
                    className="border-2 border-r-0 border-base-content text-accent-content"
                    auto size="md" onClick={handleDisminuir} disabled={cantidad == 0} variant="ghost"
            >
                -
            </Button>
            <span className="border-2 border-r-0 border-l-0 border-base-content"
              style={{
                padding: "0 1.5rem",
                fontSize: "1.53rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "neutral-content",
            }}>
                {cantidad + cantidadQuery}
            </span>
            <Button className="border-2 border-l-0 border-base-content text-accent-content"
                style={{
                    fontSize: "1.25rem",
                    borderRadius: "0 8px 8px 0",
                    backgroundColor: "neutral-content",
                }}
                auto size="md" onClick={handleIncremento} disabled={cantidad+cantidadQuery == maxAmount} variant="ghost"
            >
                +
            </Button>
        </div>
    )
}