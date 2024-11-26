import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ModalHistory from "./ModalHistory.jsx";

// eslint-disable-next-line react/prop-types
export default function ArrayHistory({ compras }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [carritoId, setSelectedCarritoId] = useState(null);

    const handleCardPress = (carritoId) => {
        setSelectedCarritoId(carritoId);
        setModalOpen(true);
    };

    return (
        <div style={{margin: "2vh", gap: "2vh"}} className="grid grid-cols-5">
            {(!compras || compras.length == 0) ? (
                <p style={{gridColumn: "1 / -1", textAlign: "center"}}>No hay compras aun</p>
            ) : (
                compras.map((compra, index) => (
                    <Card
                        className="border-2 border-base-300 bg-neutral-content"
                        shadow="sm"
                        key={index}
                        isPressable
                        onPress={() => handleCardPress(compra.id)}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                alt={compra.id}
                                width="100%"
                                className="w-full object-contain h-[100px] border-1 border-base-300 bg-neutral-content"
                                src="assets/markap.jpg"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>Fecha</b>
                            <p className="text-default-500">{compra.updatedAt.split('T')[0]}</p>
                        </CardFooter>
                    </Card>
                ))
            )}
            <ModalHistory
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                carritoId={carritoId}
            />
        </div>
    );
}
