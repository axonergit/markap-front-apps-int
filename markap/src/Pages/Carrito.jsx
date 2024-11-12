import axiosClient from "../config/axiosClient.js";
import {useContext, useEffect, useState} from "react";
import Navbar from "../Components/Navbar.jsx";
import ModalCarrito from "../Components/Me/ModalCarrito.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";
import {jwtDecode} from "jwt-decode";

const Carrito = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [precioTotal, setPrecioTotal] = useState(0.0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensaje, setModalMensaje] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        fetchCarritoItems();
        const updatedToken = localStorage.getItem("authToken");
        setToken(updatedToken);
    }, []);

    useEffect(() => {
        // Calculo de precio total cada vez que cambian los items
        const total = items.reduce((acc, item) => acc + item.product.precio * item.amount, 0);
        setPrecioTotal(total);
    }, [items]);

    const fetchCarritoItems = async () => {

        let allItems = [];
        setLoading(true);

        try {
            let page = 0;
            let hayMasPaginas = true;
            const size = 25;

            while (hayMasPaginas) {
                const response = await axiosClient.get(`/carrito/actual/items?page=${page}&size=${size}`);
                const data = response.data;

                allItems = [...allItems, ...data.content];
                hayMasPaginas = page < data.totalPages - 1;
                page++;
            }
            setItems(allItems);
            setLoading(false);
        } catch (error) {
            setError('Carrito vacio.');
            setLoading(false);
        }
    };

    const accionComprar = async () => {
        try {
            const response = await axiosClient.put('/carrito/actual/paid');
            if (response.data.carrito.paymentStatus) {
                setModalMensaje('Gracias por su compra');
                setModalVisible(true);
                window.location.href = '/';
            } else {
                setModalMensaje('Falta de stock, se ajusta cantidad');
                setModalVisible(true);
                await fetchCarritoItems();
            }
        } catch (error) {
            setModalMensaje('Ocurrio un error, intentelo mas tarde');
            setModalVisible(true);
            await fetchCarritoItems();
        }
    };

    const handleVolver = () => {
        // Navegación para el botón de "Volver"
        window.location.href = '/';
    };

    const handleAgregarItem = async (productId) => {
        try {
            await axiosClient.put(`/carrito/add/${productId}`, null,{ params: { amount:1 }});
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
            await axiosClient.put(`/carrito/remove/${productId}`, null,{ params: { amount:1 }});
            setItems((prevItems) =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, amount: item.amount - 1 } : item
                )
            );
            await fetchCarritoItems();
        } catch (error) {
            console.error('Error eliminando una unidad del item:', error);
        }
    };

    const handleEliminarItem = async (productId) => {
        try {
            const cantBorrar = items.find(item => item.product.id === productId).amount;
            await axiosClient.put(`/carrito/remove/${productId}`, null, { params: { amount:cantBorrar },});
            setItems((prevItems) =>
                prevItems.filter(item => item.product.id !== productId)
            );
            await fetchCarritoItems();
        } catch (error) {
            console.error('Error eliminando item:', error);
        }
    }

    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("authToken");
            window.location.href = '/';
        }
    }

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
                {loading ? (
                    <div>Cargando...</div>
                ) : items.length === 0 ? (
                    <div className="relative">
                        <div>No hay items en el carrito.</div>
                        <button className="btn btn-secondary absolute bottom-4 right-4" onClick={handleVolver}>
                            Volver
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item) => (
                            <div key={item.id} className="card w-96 bg-base-100 shadow-xl flex flex-col justify-between">
                                <button className="btn btn-sm btn-outline btn-error absolute top-4 right-4" onClick={() => handleEliminarItem(item.product.id)}>X</button>
                                <Link to={`/producto/${item.product.id}`}>
                                    <figure className="flex-grow">
                                        <img className="h-48 object-contain" src={`data:image/jpeg;base64,${item.product.imagen}`} alt={item.product.descripcion} />
                                    </figure>
                                </Link>
                                <div className="card-body flex flex-col justify-between">
                                    <Link to={`/producto/${item.product.id}`}>
                                        <h2 className="card-title">{item.product.descripcion}</h2>
                                    </Link>
                                    <div className="flex justify-between items-center mb-2">
                                        <button className="btn btn-sm btn-outline btn-error" onClick={() => handleRemoverItem(item.product.id)}>-</button>
                                        <span className="text-sm font-bold">{item.amount}</span>
                                        <button className="btn btn-sm btn-outline btn-success" onClick={() => handleAgregarItem(item.product.id)}>+</button>
                                    </div>
                                    <p>Precio unitario: ${item.product.precio.toFixed(2)}</p>
                                    <p>Subtotal: ${(item.amount * item.product.precio).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button className="btn btn-primary fixed bottom-4 right-4" onClick={accionComprar}>
                    Comprar - Total: ${precioTotal.toFixed(2)}
                </button>
                <ModalCarrito
                    visible={modalVisible}
                    cerado={() => setModalVisible(false)}
                    mensaje={modalMensaje}
                />
            </div>
        </>
    );
}

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

export default Carrito;