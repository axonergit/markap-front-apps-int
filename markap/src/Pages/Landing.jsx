import MyNavbar from "../Navbar.jsx";
import {Button, ButtonGroup} from "@nextui-org/button";


const Landing = () => {
    return (
        <>
        <MyNavbar></MyNavbar>
            <div className="w-screen h-screen bg-gradient-to-l from-blue-950 to-blue-500 grid p-4 gap-4 grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                <div className="w-32 h-32 bg-white"></div>
                <div className="w-32 h-32 bg-red-400"></div>
                <div className="w-32 h-32 bg-amber-400"></div>
                <div className="w-32 h-32 bg-green-400"></div>

            </div>
        </>
    )
}

export default Landing
