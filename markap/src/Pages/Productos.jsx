import TablaProductos from "../Components/TablaProductos.jsx";
import MyNavbar from "../Components/Navbar.jsx";
import CrearProducto from "../Components/CrearProducto.jsx";

const Productos = () => {
    return (
        <div className="flex flex-col">
            <MyNavbar>
            </MyNavbar>
            <TablaProductos>
            </TablaProductos>
        </div>

    )
}

export default Productos;