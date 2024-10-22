import { useForm } from "react-hook-form";
import { DatePicker, Input, Button } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import axiosClient from "../config/axiosClient.js";
import { useState } from "react";

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
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-gray-600 to-gray-800">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-5/6 bg-white p-8 rounded-2xl gap-8 md:w-2/3 lg:w-5/12 sm:p-14">
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
                        {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 3, message: "La contraseña tiene que tener más de 3 caracteres." } })}
                        label={"Contraseña"}
                        placeholder="Ingrese su contraseña"
                        type={"password"}
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                </div>
                <div>
                    <Input
                        {...register("name", { required: "El nombre es obligatorio" })}
                        label={"Nombre"}
                        placeholder="Ingrese su nombre"
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
                </div>
                <div>
                    <Input
                        {...register("lastName", { required: "El apellido es obligatorio" })}
                        label={"Apellido"}
                        placeholder="Ingrese su apellido"
                        isRequired={true}
                        variant="bordered"
                        isInvalid={!!errors.lastName}
                        errorMessage={errors.lastName?.message}
                    />
                </div>
                <div>
                    <Input
                        {...register("email", { required: "El correo electrónico es obligatorio" })}
                        label={"Correo electrónico"}
                        placeholder="Ingrese su correo electrónico"
                        type={"email"}
                        variant="bordered"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                </div>

                <DatePicker variant="bordered" label="Fecha de nacimiento" onChange={handleDateChange} />

                <Button type="submit" color="primary" isLoading={isLoading}>
                    Registrarse
                </Button>
            </form>
        </div>
    );
};

export default Register;
