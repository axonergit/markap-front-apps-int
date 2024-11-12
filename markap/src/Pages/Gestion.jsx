import TablaProductos from "../Components/Gestion/TablaProductos.jsx";
import MyNavbar from "../Components/Navbar.jsx";
import {useEffect} from "react";

const Gestion = () => {
    useEffect(() => {
        document.title = "Markap - Producto Categoria";
    }, []);

    return (
        <div className="flex flex-col">
            <MyNavbar>
            </MyNavbar>
            <TablaProductos>
            </TablaProductos>
        </div>

    )
}

export default Gestion;