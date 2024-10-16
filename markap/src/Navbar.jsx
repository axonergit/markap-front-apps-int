import {Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button} from "@nextui-org/react";
import {useState} from "react";
import { Link } from "react-router-dom"; // Importa el Link de React Router

const MyNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link to="/" className="text-foreground">
                        Landing
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link to="/login" className="text-foreground">
                        Login
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/register" className="text-foreground">
                        Register
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/me" className="text-foreground">
                        Me
                    </Link>
                </NavbarItem>
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
                            to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} // Genera enlaces dinámicos
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

export default MyNavbar;
