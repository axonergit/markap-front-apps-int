import { FaShoppingCart, FaUser, FaBox } from 'react-icons/fa'; // Ejemplo con react-icons

const SideMe = () => {
    return (
        <div className="bg-red-600 h-screen p-4 md:w-2/12">
            <ul className="mt-4 flex flex-col justify-center gap-8 sm:gap-4 ">
                <li className="text-white  flex items-center">
                    <FaUser size={24} className="block sm:hidden"/>
                    <span className="hidden sm:block sm:text-xl md:text-2xl">Mis detalles</span>
                </li>
                <li className="text-white flex items-center">
                    <FaBox size={24} className="block sm:hidden "/>
                    <span className="hidden sm:block sm:text-xl  md:text-2xl">Mis compras</span>
                </li>
                <li className="text-white  flex items-center">
                    <FaShoppingCart size={24} className="block sm:hidden"/>
                    <span className="hidden sm:block sm:text-xl md:text-2xl">Mi carrito</span>
                </li>
            </ul>
        </div>
    );
};

export default SideMe;