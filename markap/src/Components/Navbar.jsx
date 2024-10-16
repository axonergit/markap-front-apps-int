import {
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate de React Router

const MyNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Elimina el token del localStorage
        navigate("/"); // Redirige a la página principal
    };

    const menuItems = ["Iniciar Sesion", "Crear Cuenta"];

    const token = localStorage.getItem("authToken");
    if (token) {
        return (
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className=""
                    />
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="lg:flex">
                        <Link to="/carrito">Carrito</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} to="/me" color="primary" variant="flat">
                            Mi cuenta
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button color="error" variant="flat" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`} // Genera enlaces dinámicos
                                className="w-full"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        );
    } else {
        return (
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link to="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} to="/register" color="primary" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`} // Genera enlaces dinámicos
                                className="w-full"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        );
    }
};

export default MyNavbar;
