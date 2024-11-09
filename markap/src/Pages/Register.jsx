import { useForm } from "react-hook-form";
import { DatePicker, Input, Button } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import axiosClient from "../config/axiosClient.js";
import { useState } from "react";
import MyNavbar from "../Components/Navbar.jsx";
const Register = () => {
    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();
    const handleDateChange = (date) => {
        setValue("birthDate", date);
    };
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setSuccessMessage(null);
            setErrorMessage(null);

            // Convertir la fecha de nacimiento al formato "YYYY-MM-DD"
            const { year, month, day } = data.birthDate;
            const formattedBirthDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            const formattedData = {
                ...data,
                birthDate: formattedBirthDate,
            };

            console.log("Datos del formulario enviados:", formattedData);
            const response = await axiosClient.post("/auth/sign-up", formattedData);
            console.log("Respuesta del servidor:", response.data);
            const token = response.data.jwt;

            localStorage.setItem("authToken", token);
            setSuccessMessage("Sesión iniciada correctamente");
            setTimeout(() => {
                window.location.href = "/"; // Redirige a la página principal después de 2 segundos
            }, 2000);
        } catch (error) {
            console.error("Error al registrar:", error.response?.data?.errorMessage || "Error en el registro");
            setErrorMessage(error.response?.data?.errorMessage || "Error en el registro");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <MyNavbar></MyNavbar>
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-2xl bg-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-lg gap-8 transition-transform transform hover:scale-105"
            >
                {errorMessage && (
                    <div className="alert alert-error flex items-center p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M18.364 5.636l-1.414 1.414a9 9 0 11-12.728 0l-1.414-1.414a11 11 0 1015.556 0z"></path>
                        </svg>
                        <span>{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div
                        className="alert alert-success flex items-center p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 12l2 2l4-4m0-4a8 8 0 11-8 8a8 8 0 018-8z"></path>
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                )}
                <div className="space-y-4">
                    <Input
                        {...register("username", {required: "El nombre de usuario es obligatorio"})}
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
                            minLength: {value: 3, message: "La contraseña tiene que tener más de 3 caracteres."}
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

                <div className="space-y-4">
                    <Input
                        {...register("name", {required: "El nombre es obligatorio"})}
                        label={"Nombre"}
                        placeholder="Ingrese su nombre"
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
                </div>

                <div className="space-y-4">
                    <Input
                        {...register("lastName", {required: "El apellido es obligatorio"})}
                        label={"Apellido"}
                        placeholder="Ingrese su apellido"
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.lastName}
                        errorMessage={errors.lastName?.message}
                    />
                </div>

                <div className="space-y-4">
                    <Input
                        {...register("email", {required: "El correo electrónico es obligatorio"})}
                        label={"Correo electrónico"}
                        placeholder="Ingrese su correo electrónico"
                        type={"email"}
                        variant="bordered"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                </div>

                <div className="space-y-4">
                    <DatePicker
                        variant="bordered"
                        label="Fecha de nacimiento"
                        onChange={handleDateChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <Button
                    type="submit"
                    color="primary"
                    isLoading={isLoading}
                    className="mt-6 w-full py-3 rounded-lg text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 ease-in-out"
                >
                    Registrarse
                </Button>
            </form>
        </div>
        </>
    )
};

export default Register;
