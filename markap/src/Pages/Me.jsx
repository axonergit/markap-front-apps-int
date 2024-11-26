import { useEffect } from 'react';
import Navbar from "../Components/Navbar.jsx";
import AboutMe from "../Components/Me/AboutMe.jsx";
import LikedProducts from "../Components/Me/LikedProducts.jsx";
import HistoryProducts from "../Components/Me/HistoryProducts.jsx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../config/axiosClient.js";

const Me = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const { data: userProfile, error, isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const response = await axiosClient.get('/users/me');
            return response.data;
        },
    });

    useEffect(() => {
        document.title = "Markap - Mi Perfil";
        if (!token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 1000 * 5);
            return () => clearTimeout(timer);
        }
    }, [error, navigate]);

    return (
        <div>
            <Navbar />
            {userProfile || isLoading ? (
                <div
                    style={{
                        padding: "2vh",
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "row",
                    }}
                >
                    <div>
                        <AboutMe userProfile={userProfile} isLoading={isLoading} error={error} />
                    </div>
                    <div
                        style={{
                            flexGrow: "1",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            marginLeft: "5vh",
                            gap: "1.2vh",
                        }}
                    >
                        <LikedProducts />
                        <HistoryProducts />
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        margin: "auto",
                        paddingTop: "2rem",
                    }}
                >
                    <p style={{ fontSize: "1.5rem" }}>
                        Ocurrió un error. Por favor, intenta nuevamente.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Me;