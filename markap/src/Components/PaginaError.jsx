// ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ statusCode, message }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Error {statusCode || ''}</h1>  {/* // No deberiamos mostrar el codigo de error */}
            <p className="text-lg text-gray-700">{message || "Ha ocurrido un error inesperado."}</p>
            <p className="text-md text-gray-500 mt-2">
                Por favor, intenta nuevamente o contacta con soporte si el problema persiste.
            </p>
            <button 
                onClick={() => navigate(-1)} 
                className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
                Volver a la página anterior
            </button>
        </div>
    );
};

export default ErrorPage;
