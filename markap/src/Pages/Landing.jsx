import MyNavbar from "../Components/Navbar.jsx";
import Destacados from "../Components/Landing/Destacados.jsx";
import Categorias from "../Components/Landing/Categorias.jsx";
import VisitadosRecientemente from "../Components/Landing/VisitadosRecientemente.jsx";
import Footer from "../Components/Landing/Footer.jsx";
import {useEffect} from "react";
import SearchBar from "../Components/SearchBar.jsx";

const Landing = () => {
    useEffect(() => {
        document.title = "Markap";
    }, []);

    return (
        <>
            <MyNavbar/>
            <SearchBar></SearchBar>
            <Destacados/>
            <Categorias></Categorias>
            <VisitadosRecientemente></VisitadosRecientemente>
            <Footer></Footer>
        </>
    )
}

export default Landing;
