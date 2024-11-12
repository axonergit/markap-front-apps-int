import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axiosClient from "../config/axiosClient.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ModificarProducto = ({ producto, onClose, size, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const queryClient = useQueryClient();

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            descripcion: '',
            precio: '',
            detalles: '',
            stock: '',
            categoria: ''
        }
    });

    // Fetch categories
    const { data: categorias } = useQuery({
        queryKey: ['Categorias'],
        queryFn: () => axiosClient.get("/productos/categoria").then((res) => res.data),
    });

    useEffect(() => {
        if (producto && isOpen) {
            reset({
                descripcion: producto.descripcion || '',
                precio: producto.precio || '',
                detalles: producto.detalles || '',
                stock: producto.stock || '',
                categoria: producto.categoria ? producto.categoria.toString() : ''
            });
        }
    }, [producto, isOpen, reset]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setSuccessMessage(null);
            setErrorMessage(null);

            const productData = {
                descripcion: data.descripcion,
                precio: Number(data.precio),
                detalles: data.detalles,
                stock: Number(data.stock),
                categoria: Number(data.categoria)
            };

            let response;
            if (data.imagen && data.imagen[0]) {
                const formData = new FormData();
                formData.append("imagen", data.imagen[0]);
                Object.entries(productData).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                response = await axiosClient.put(`/productos/${producto.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                response = await axiosClient.put(`/productos/${producto.id}`, productData, {
                    headers: { "Content-Type": "application/json" }
                });
            }

            console.log("Server response:", response.data);

            setSuccessMessage("Producto modificado exitosamente");
            queryClient.invalidateQueries(['Productos']);

            // Update the local state of the product
            queryClient.setQueryData(['Productos'], (oldData) => {
                return oldData.map(p => p.id === producto.id ? { ...p, ...productData } : p);
            });

            setTimeout(() => {
                setIsOpen(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error details:", error);
            setErrorMessage(error.response?.data?.message || "Error al modificar el producto");
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = () => {
        setIsOpen(true);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSuccessMessage(null);
        setErrorMessage(null);
        reset();
    };

    return (
        <>
            <Button color="primary" onPress={openModal} size={size} className={className}>
                Modificar
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                size="3xl"
                scrollBehavior="inside"
            >
                <ModalContent className="overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">Modificar Producto</ModalHeader>
                        <ModalBody>
                            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                            <Controller
                                name="descripcion"
                                control={control}
                                rules={{ required: "La descripción es obligatoria" }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Descripción"
                                        placeholder="Ingrese la descripción del producto"
                                        isInvalid={!!errors.descripcion}
                                        errorMessage={errors.descripcion?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="precio"
                                control={control}
                                rules={{ required: "El precio es obligatorio" }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Precio"
                                        placeholder="Ingrese el precio del producto"
                                        type="number"
                                        isInvalid={!!errors.precio}
                                        errorMessage={errors.precio?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="detalles"
                                control={control}
                                rules={{ required: "Los detalles son obligatorios" }}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Detalles"
                                        placeholder="Ingrese los detalles del producto"
                                        isInvalid={!!errors.detalles}
                                        errorMessage={errors.detalles?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="stock"
                                control={control}
                                rules={{ required: "El stock es obligatorio" }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Stock"
                                        placeholder="Ingrese el stock del producto"
                                        type="number"
                                        isInvalid={!!errors.stock}
                                        errorMessage={errors.stock?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="categoria"
                                control={control}
                                rules={{ required: "La categoría es obligatoria" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Categoría"
                                        placeholder="Seleccione una categoría"
                                        isInvalid={!!errors.categoria}
                                        errorMessage={errors.categoria?.message}
                                    >
                                        {categorias?.map((categoria) => (
                                            <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                                {categoria.nombreCategoria}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            <Controller
                                name="imagen"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        label="Imagen"
                                        onChange={(e) => field.onChange(e.target.files)}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={closeModal}>
                                Cerrar
                            </Button>
                            <Button color="primary" type="submit" isLoading={isLoading}>
                                Modificar
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

ModificarProducto.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        descripcion: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        detalles: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        categoria: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
};

export default ModificarProducto;