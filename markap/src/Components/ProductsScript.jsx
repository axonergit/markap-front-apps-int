import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";

// eslint-disable-next-line react/prop-types
export default function ProductsScript({ productosResponse }) {

    const { data: productos, isLoading, error } = useQuery({
        queryKey: ['Productos'],
        queryFn: async () => {
            const response = await axiosClient.get(`/productos`);
            return response.data;
        },
    });

    const navegar = useNavigate();

    const handleCardClick = (descripcion) => {
        if (productos) {
            const productoEncontrado = productos.find(item => item.descripcion === descripcion);
            if (productoEncontrado) {
                navegar(`../producto/${productoEncontrado.id}`);
            } else {
                console.log("Producto no encontrado");
            }
        }
    };

    return (
        <div style={{ margin: "2vh", gap: "2vh" }} className="grid grid-cols-5">
            {productosResponse.map((item, index) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => handleCardClick(item.descripcion)} // Enviar la descripción para hacer el finding
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.descripcion}
                            width="100%"
                            className="w-full object-contain h-[200px]"
                            src={item.imagen}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.descripcion}</b>
                        <p className="text-default-500">$ {item.precio}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
