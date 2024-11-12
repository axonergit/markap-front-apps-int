import { useEffect } from 'react';
import Navbar from "../Components/Navbar.jsx";
import AboutMe from "../Components/AboutMe.jsx";
import LikedProducts from "../Components/LikedProducts.jsx";
import HistoryProducts from "../Components/HistoryProducts.jsx";

const Me = () => {
    useEffect(() => {
        document.title = "Markap - Mi Perfil";
    }, []);
    return (
        <>

            <Navbar/>
            <div className={"bg-gradient-to-r from-slate-900 to-slate-800"}
                 style={{
                    padding: "2vh",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    minHeight: "100vh",
                }}>
                <div>
                    <AboutMe />
                </div>
                <div style={
                    {
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        marginLeft: "5vh",
                        gap: "1.2vh"
                    }}>
                    <LikedProducts/>
                    <HistoryProducts/>
                </div>
            </div>
        </>
    );
};

export default Me;
