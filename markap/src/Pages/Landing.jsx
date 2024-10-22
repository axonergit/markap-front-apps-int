import MyNavbar from "../Components/Navbar.jsx";
import Destacados from "../Components/Destacados.jsx";
import Categorias from "../Components/Categorias.jsx";

const Landing = () => {
    const token = localStorage.getItem("authToken");
    return (
        <>
            <MyNavbar/>
            {/* Div para productos destacados */}
            <div className="w-screen h-1/3 bg-gradient-to-l from-blue-950 to-blue-500 flex justify-center items-center">
                <Destacados/>
            </div>

            {/* Sección de las categorías */}
            <Categorias></Categorias>

            {token ? <h1>Logeado gil</h1> : <h1>No logeado gil</h1>}
        </>
    )
}

export default Landing;
