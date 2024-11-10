import MyNavbar from "../Components/Navbar.jsx";
import Destacados from "../Components/Destacados.jsx";
import Categorias from "../Components/Categorias.jsx";
import Footer from "../Components/Footer.jsx";
import PaginationMinimal from "../Components/PaginationMinimal.jsx";
import VisitadosRecientemente from "../Components/VisitadosRecientemente.jsx";

const Landing = () => {

    const token = localStorage.getItem("authToken");

    return (
        <>
            <MyNavbar/>
            {/* Div para productos destacados */}
            <div className="w-full md:h-1/2 bg-gradient-to-l from-blue-950 to-blue-500 flex justify-center items-center ">
                <Destacados/>
                
            </div>
            {/* Sección de las categorías */}
            <div >
                <Categorias></Categorias>
                
            </div>
            
            
            {token ? <h1>Logeado gil</h1> : <h1>No logeado gil</h1>}

            <div className= "h-full bg-gradient-to-r from-black to-lime-600 flex justify-center items-center">

            <VisitadosRecientemente></VisitadosRecientemente>

            </div>
            <Footer></Footer>
        </>
    )
}

export default Landing;

//VER CLASE DEL 29/10 PARA MANEJO DE ROLES, USO DE CONTEXTO, RUTEEO