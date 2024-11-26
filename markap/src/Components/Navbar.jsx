import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate de React Router
import { jwtDecode } from "jwt-decode";
import { fetchCarritoData } from "../Pages/Carrito.jsx";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";


const MyNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Elimina el token del localStorage
        navigate("/"); // Redirige a la página principal
        window.location.reload(); // Recarga la página
    };

    const [cantidadItems, setCantidadItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0.0);

    let authorities = [];
    const token = localStorage.getItem("authToken");

    // Validar si hay un token válido
    if (token) {
        try {
            authorities = jwtDecode(token).authorities || [];
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }

    useEffect(() => {
        if (token) {
            const intervalId = setInterval(() => {
                const loadCarritoData = async () => {
                    try {
                        const { cantidadItems, subtotal } = await fetchCarritoData();
                        setCantidadItems(cantidadItems);
                        setSubtotal(subtotal);
                    } catch (error) {
                        console.error("handleError", error);
                        localStorage.removeItem("authToken");
                        window.location.reload();
                    }
                };
                loadCarritoData();
            }, 1000 * 5);
            return () => clearInterval(intervalId);
        }
    }, [token]);

    return (
        <div className="navbar bg-base-200 border-5 border-base-300 border-t-0 border-l-0 border-r-0">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Markap
                </Link>
            </div>
            {token ? (
                <div className="flex-none space-x-3">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item bg-neutral-content text-neutral">
                                {cantidadItems}
                            </span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                        >
                            <div className="card-body">
                                <span className="text-lg font-bold">{cantidadItems} Items</span>
                                <span className="text-info">Subtotal: ${subtotal}</span>
                                <div className="card-actions">
                                    <Link to="/carrito">
                                        <button className="btn btn-primary btn-block">Ver carrito</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Avatar"
                                    src="https://akamai.sscdn.co/uploadfile/letras/fotos/5/9/1/b/591b070413cf1d9c34bc8528ee500268.jpg"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/me">Mi perfil</Link>
                            </li>
                            {authorities.includes("ROLE_ADMIN") && (
                                <li>
                                    <Link to="/admin/productos">Mis productos</Link>
                                </li>
                            )}
                            <li onClick={handleLogout}>
                                <a>Cerrar Sesión</a>
                            </li>
                        </ul>
                    </div>
                    <ThemeToggle />
                </div>
            ) : (
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/login">Iniciar Sesión</Link>
                        </li>
                        <li className="font-bold">
                            <Link to="/register">Registrarse</Link>
                        </li>
                        <ThemeToggle />
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyNavbar;
