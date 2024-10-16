// axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080", // Reemplaza con la URL base de tu API
    timeout: 10000, // Tiempo de espera máximo de 10 segundos
});

// Interceptor de solicitudes para agregar token de autenticación si es necesario
axiosClient.interceptors.request.use(
    (config) => {
        // Puedes agregar un token aquí si lo necesitas
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuestas para manejo de errores
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo de errores global (opcional)
        if (error.response && error.response.status === 401) {
            console.error("No autorizado, redirigir al login...");
            // Puedes redirigir al usuario al login, por ejemplo
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
