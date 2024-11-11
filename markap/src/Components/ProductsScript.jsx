import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function ProductsScript({ products }) {
    return (
        <div style={{margin: "2vh", gap: "2vh"}} className="grid grid-cols-5">
            {/* eslint-disable-next-line react/prop-types */}
            {products.map((item, index) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => console.log(`${item.id} pressed`)}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.id}
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
