import axiosClient from "../config/axiosClient.js";
import {useEffect, useState} from "react";
import Navbar from "../Components/Navbar.jsx";

const CarritoItems = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCarritoItems();
    }, []);

    const fetchCarritoItems = async () => {
        try {
            const response = await axiosClient.get('/carrito/actual/items');
            if (response.data && response.data.content) {
                setItems(response.data.content);
            } else {
                setError('No se encontraron items.');
            }
            setLoading(false);
        } catch (error) {
            setError('Error cargando el carrito.');
            setLoading(false);
        }
    };

    const accionComprar = async () => {
        try {
            const response = await axiosClient.put('/carrito/actual/paid');
            if (response.data.carrito.paymentStatus) {
                window.location.href = '/';
            } else {
                alert('Error al pagar el carrito.');
            }
        } catch (error) {
            alert('Ocurrio un error, intentelo mas tarde');
        }
    }

    const handleVolver = () => {
        // Navegación para el botón de "Volver"
        window.location.href = '/';
    };

    const handleAgregarItem = async (productId) => {
        try {
            await axiosClient.put(`/carrito/add/${productId}`, { amount: 1 });
            setItems((prevItems) =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, amount: item.amount + 1 } : item
                )
            );
            await fetchCarritoItems();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleRemoverItem = async (productId) => {
        try {
            await axiosClient.put(`/carrito/remove/${productId}`, { amount: 1 });
            setItems((prevItems) =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, amount: item.amount - 1 } : item
                )
            );
            await fetchCarritoItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    {error}
                    <div className="mt-4">
                        <button className="btn btn-primary" onClick={handleVolver}>
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
                    {items.length === 0 ? (
                        <div className="relative">
                            <div> No hay items en el carrito. </div>
                            <button className="btn btn-secondary absolute bottom-4 right-4" onClick={handleVolver}>
                                Volver
                            </button>
                        </div>
                        ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="card w-96 bg-base-100 shadow-xl">
                            <figure>
                                <img src={`data:image/jpeg;base64,${item.product.imagen}`} alt={item.product.descripcion} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.product.descripcion}</h2>
                                <div className="flex justify-between items-center mb-2">
                                    <button className="btn btn-sm btn-outline" onClick={() => handleRemoverItem(item.product.id)}>-</button>
                                    <span className="text-sm font-bold">{item.amount}</span>
                                    <button className="btn btn-sm btn-outline" onClick={() => handleAgregarItem(item.product.id)}>+</button>
                                </div>
                                <p>Precio unitario: ${item.product.precio.toFixed(2)}</p>
                                <p>Precio total: ${(item.amount * item.product.precio).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                        </div>
                    )}
                    <button className="btn btn-primary absolute bottom-4 right-4" onClick={accionComprar}>Comprar</button>
                </div>
        </>
    );
};

export const fetchCarritoData = async () => {
    try {
        const response = await axiosClient.get('/carrito/actual/items');
        const cartData = response.data;
        let cantidadItems = 0;
        let subtotal = 0.0;

        cartData.content.forEach(item => {
            cantidadItems += item.amount;
            subtotal += item.amount * item.product.precio;
        });

        return { cantidadItems, subtotal };
    } catch (error) {
        console.error('Error capturando items del carrito:', error);
        return { cantidadItems: 0, subtotal: 0.0 };
    }
};

export default CarritoItems;