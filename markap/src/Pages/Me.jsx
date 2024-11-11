import { } from '@nextui-org/react';
import Navbar from "../Components/Navbar.jsx";
import AboutMe from "../Components/AboutMe.jsx";
import LikedProducts from "../Components/LikedProducts.jsx";
import HistoryProducts from "../Components/HistoryProducts.jsx";

const Me = () => {

    return (
        <>
            <Navbar/>
            <div className={"to-blue-500"} style={
                {
                    padding: "2vh",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row"
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
