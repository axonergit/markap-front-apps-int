const ModalCarrito = ({visible, cerado, mensaje}) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shhadow-lg w-1/3 max-w-md">
                <h2 className="text-lg font-semibold mb-4">{mensaje}</h2>
                <div className="flex justify-end">
                    <button className="btn btn-primary" onClick={cerado}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalCarrito;