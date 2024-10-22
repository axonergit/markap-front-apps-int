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
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-gray-600 to-gray-800">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-5/6 h-2/3 bg-white p-8 rounded-2xl gap-32 md:w-2/3 lg:w-5/12 sm:p-14">
                {errorMessage && (
                    <div className="alert alert-error mb-4">
                        <span>{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success mb-4">
                        <span>{successMessage}</span>
                    </div>
                )}
                <div>
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

                <div>
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
                <Button type="submit" color="primary" isLoading={isLoading}>
                    Iniciar sesión
                </Button>
            </form>
        </div>
    );
};

export default Login;
