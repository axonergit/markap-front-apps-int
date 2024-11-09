import { useForm } from "react-hook-form";
import { Input, Button, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axiosClient from "../config/axiosClient.js";
import {useQuery} from "@tanstack/react-query";

const ModificarProducto = ({ producto }) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetch categories
    const { isLoading: categoriasLoading, error: categoriasError, data: categorias } = useQuery({
        queryKey: ['Categorias'],
        queryFn: () => axiosClient.get("/productos/categoria").then((res) => res.data),
    });

    useEffect(() => {
        if (producto) {
            setValue("descripcion", producto.descripcion);
            setValue("precio", producto.precio);
            setValue("detalles", producto.detalles);
            setValue("stock", producto.stock);
            setValue("categoria", producto.categoria);
        }
    }, [producto, setValue]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setSuccessMessage(null);
            setErrorMessage(null);

            const formData = new FormData();
            formData.append("imagen", data.imagen[0]);
            formData.append("descripcion", data.descripcion);
            formData.append("precio", data.precio);
            formData.append("detalles", data.detalles);
            formData.append("stock", data.stock);
            formData.append("categoria", data.categoria);

            const response = await axiosClient.put(`/productos/${producto.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setSuccessMessage("Producto modificado exitosamente");
            setTimeout(() => {
                document.getElementById('my_modal_5').close();
            }, 2000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error al modificar el producto");
        } finally {
            setIsLoading(false);
        }
    };

    if (categoriasLoading) return <p>Loading...</p>;
    if (categoriasError) return <p>Error cargando categorías</p>;

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Modificar</button>
            <dialog id="my_modal_5" className="modal">
                <form onSubmit={handleSubmit(onSubmit)} className="modal-box w-11/12 max-w-5xl flex flex-col gap-6">
                    <h1>Modificar Producto</h1>
                    {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <Input
                        {...register("descripcion", {required: "La descripción es obligatoria"})}
                        label="Descripción"
                        placeholder="Ingrese la descripción del producto"
                        variant="bordered"
                        isInvalid={!!errors.descripcion}
                        errorMessage={errors.descripcion?.message}
                    />

                    <Input
                        {...register("precio", {required: "El precio es obligatorio"})}
                        label="Precio"
                        placeholder="Ingrese el precio del producto"
                        type="number"
                        variant="bordered"
                        isInvalid={!!errors.precio}
                        errorMessage={errors.precio?.message}
                    />

                    <Textarea
                        {...register("detalles", {required: "Los detalles son obligatorios"})}
                        label="Detalles"
                        placeholder="Ingrese los detalles del producto"
                        variant="bordered"
                        isInvalid={!!errors.detalles}
                        errorMessage={errors.detalles?.message}
                    />

                    <Input
                        {...register("stock", {required: "El stock es obligatorio"})}
                        label="Stock"
                        placeholder="Ingrese el stock del producto"
                        type="number"
                        variant="bordered"
                        isInvalid={!!errors.stock}
                        errorMessage={errors.stock?.message}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoría</label>
                        <select
                            {...register("categoria", {required: "La categoría es obligatoria"})}
                            className="border border-gray-300 rounded-lg w-full px-3 py-2"
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombreCategoria}
                                </option>
                            ))}
                        </select>
                        {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria.message}</p>}
                    </div>

                    <Input
                        {...register("imagen")}
                        label="Imagen"
                        type="file"
                        variant="bordered"
                    />

                    <div className="modal-action">
                        <Button type="submit" color="primary" isLoading={isLoading}>
                            Modificar
                        </Button>
                        <Button type="button" color="secondary"
                                onClick={() => document.getElementById('my_modal_5').close()}>
                            Cerrar
                        </Button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

export default ModificarProducto;