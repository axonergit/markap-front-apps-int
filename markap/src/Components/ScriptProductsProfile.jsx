import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function ScriptProductsProfile({ products }) {
    if (!products) {
        products = [
            { title: "Orange", img: "/images/fruit-1.jpeg", price: "$5.50" },
            { title: "Tangerine", img: "/images/fruit-2.jpeg", price: "$3.00" },
            { title: "Raspberry", img: "/images/fruit-3.jpeg", price: "$10.00" },
            { title: "Lemon", img: "/images/fruit-4.jpeg", price: "$5.30" },
        ];
    }

    return (
        <div style={{margin: "2vh", gap: "2vh"}} className="grid grid-cols-2 grid-cols-4 ">
            {/* eslint-disable-next-line react/prop-types */}
            {products.map((item, index) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => console.log(`${item.title} pressed`)}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.title}
                            className="w-full object-cover h-[140px]"
                            src={item.img}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
