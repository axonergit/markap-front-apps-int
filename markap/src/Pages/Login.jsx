import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../config/axiosClient.js";
import { useState } from "react";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setSuccessMessage(null);
            setErrorMessage(null);

            const response = await axiosClient.post("/auth/log-in", data);
            console.log("Respuesta del servidor:", response.data);
            const token = response.data.jwt;
            localStorage.setItem("authToken", token);

            setSuccessMessage("Sesión iniciada correctamente");
            setTimeout(() => {
                window.location.href = "/"; // Redirige a la página principal después de 2 segundos
            }, 2000);
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response?.data?.errorMessage || "Error en el inicio de sesión");
            setErrorMessage(error.response?.data?.errorMessage || "Error en el inicio de sesión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-lg bg-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-lg gap-8 transition-transform transform hover:scale-105"
            >
                {errorMessage && (
                    <div className="alert alert-error flex items-center p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-1.414 1.414a9 9 0 11-12.728 0l-1.414-1.414a11 11 0 1015.556 0z"></path>
                        </svg>
                        <span>{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success flex items-center p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m0-4a8 8 0 11-8 8a8 8 0 018-8z"></path>
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                )}
                <div className="space-y-4">
                    <Input
                        {...register("username", { required: "El nombre de usuario es obligatorio" })}
                        label={"Nombre de usuario"}
                        placeholder="Ingrese su nombre de usuario"
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.username}
                        errorMessage={errors.username?.message}
                    />
                </div>

                <div className="space-y-4">
                    <Input
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: { value: 3, message: "La contraseña tiene que tener más de 3 caracteres." }
                        })}
                        label={"Contraseña"}
                        placeholder="Ingrese su contraseña"
                        type={"password"}
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                </div>

                <Button
                    type="submit"
                    color="primary"
                    isLoading={isLoading}
                    className="mt-6 w-full py-3 rounded-lg text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 ease-in-out"
                >
                    Iniciar sesión
                </Button>
            </form>
        </div>
    );

};

export default Login;
