import { useState } from 'react';

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
            <button className="btn btn-info btn-sm" onClick={openModal}>
                Ver imagen
            </button>
            <dialog id={`modal_imagen_${producto.id}`} className={`modal ${isOpen ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{producto.descripcion}</h3>
                    <div className="py-4">
                        {imageError ? (
                            <div className="text-center text-gray-500">
                                No se pudo cargar la imagen
                            </div>
                        ) : producto.imagen ? (
                            <img
                                src={producto.imagen}
                                alt={producto.descripcion}
                                className="w-full h-auto object-contain"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                No hay imagen disponible
                            </div>
                        )}
                    </div>
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default VerImagenProducto;