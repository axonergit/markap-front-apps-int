import MyNavbar from "../Components/Navbar.jsx";
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../config/axiosClient.js";
import ProductoImage from "../Components/ProductoImage.jsx";
import { useParams } from "react-router-dom";
import ProductoInfo from "../Components/ProductoInfo.jsx";

const ProductoVista = () => {

    const { productId } = useParams();
    const {data: ProductoResponse, isLoading, error} = useQuery({
        queryKey: ['Producto', productId],
        queryFn: async () => {
            const response = await axiosClient.get(`/productos/${productId}`);
            console.log(productId, response.data);
            return response.data;
        },
        staleTime: 1000 * 60 * 2,
    })

    return (
        <div className="flex flex-col">
            <MyNavbar/>
            <div className="flex flex-row">
                {ProductoResponse && <ProductoImage productoJson={ProductoResponse}/>}
                <div style={{display: "flex", flexGrow: "1", flexDirection: "column"}}>
                    {ProductoResponse && <ProductoInfo productoJson={ProductoResponse}/>}
                </div>
            </div>
        </div>
    )
}

export default ProductoVista;