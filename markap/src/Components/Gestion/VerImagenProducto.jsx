import { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Image } from "@nextui-org/react";

const VerImagenProducto = ({ producto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <>
            <Button color="primary" onPress={openModal} size="sm" className="w-[90px]">
                Ver imagen
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal} size="xl">
                <ModalContent>
                    <ModalHeader>{producto.descripcion}</ModalHeader>
                    <ModalBody>
                        {imageError ? (
                            <div className="text-center text-gray-500">
                                No se pudo cargar la imagen
                            </div>
                        ) : producto.imagen ? (
                            <Image
                                src={producto.imagen}
                                alt={producto.descripcion}
                                width={400}
                                height={400}
                                objectFit="contain"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                No hay imagen disponible
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={closeModal}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default VerImagenProducto;