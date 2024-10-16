import {useForm} from "react-hook-form";
import {DatePicker, Input,Button} from "@nextui-org/react";

const Register = () => {
    const {register,setValue ,handleSubmit, watch, formState: {errors}} = useForm();
    const handleDateChange = (date) => {
        setValue("birthDate",date)
    }


    const onSubmit = data => console.log(data);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 to-blue-500">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-5/6 bg-white p-8 rounded-2xl gap-8 md:w-2/3 lg:w-5/12 sm:p-14">
                <div>
                    <Input
                        {...register("username", {required: true})}
                        label={"Nombre de usuario"}
                        placeholder="Ingrese su nombre de usuario"
                        isRequired={true}
                    />
                    {errors.username && (<span>This field is required</span>)}
                </div>

                <div>
                    <Input
                        {...register("password", {required: true})}
                        label={"Contraseña"}
                        placeholder="Ingrese su contraseña"
                        type={"password"}
                        isRequired={true}
                    />
                    {errors.password && (<span>This field is required</span>)}
                </div>
                <div>
                    <Input
                        {...register("name", {required: true})}
                        label={"Nombre"}
                        placeholder="Ingrese su contraseña"
                        isRequired={true}
                    />
                    {errors.name && (<span>This field is required</span>)}
                </div>
                <div>
                    <Input
                        {...register("lastName", {required: true})}
                        label={"Apellido"}
                        placeholder="Ingrese su contraseña"
                        isRequired={true}
                    />
                    {errors.lastName && (<span>This field is required</span>)}
                </div>
                <div>
                    <Input
                        {...register("email", {required: true})}
                        label={"Correo electronico"}
                        placeholder="Ingrese su correo electronico"
                        type={"email"}
                        isRequired={true}

                    />
                    {errors.email && (<span>This field is required</span>)}
                </div>

                <DatePicker label="Fecha de nacimiento" onChange={handleDateChange}/>
                <Button type="submit" color="primary">Registrarse</Button>

            </form>

        </div>
    )
}


export default Register;