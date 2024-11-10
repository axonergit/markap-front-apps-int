import {Link, useNavigate} from "react-router-dom"; // Importa Link y useNavigate de React Router
import {jwtDecode} from "jwt-decode";
import { fetchCarritoData } from "../Pages/Carrito.jsx";
import {useEffect, useState} from "react";

const MyNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Elimina el token del localStorage
        navigate("/"); // Redirige a la página principal
        window.location.reload(); // Recarga la página
    };

    // constantes de informacion de carrito
    const [cantidadItems, setCantidadItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0.0);

    // carga de info de carrito
    useEffect(() => {
        const loadCarritoData = async () => {
            const { cantidadItems, subtotal } = await fetchCarritoData();
            setCantidadItems(cantidadItems);
            setSubtotal(subtotal);
        };

        loadCarritoData();
    }, []);

    let authorities = []

    const token = localStorage.getItem("authToken");

    if (token) {
        authorities = jwtDecode(token).authorities || [];
    }
    if (!token) {
        return (
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        Markap
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/login">Iniciar Sesion</Link></li>
                        <li className="font-bold"><Link to="/register">Registrarse</Link></li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="navbar bg-base-100">
                <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Markap
                </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span
                                    className="badge badge-sm indicator-item">{cantidadItems}</span> {/*Aca es donde va la cantidad de items*/}
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
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
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/me">Mi perfil</Link>
                            </li>
                            { authorities.includes("ROLE_ADMIN") && (
                                    <li>
                                        <Link to="/admin/productos">Mis productos</Link>
                                    </li>
                            )}

                            <li onClick={handleLogout}><a>Cerrar Sesion</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyNavbar;
