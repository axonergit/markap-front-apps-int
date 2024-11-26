import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axiosClient from "../../config/axiosClient.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ModificarProducto = ({ producto, onClose, size, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            descripcion: '',
            precio: '',
            detalles: '',
            stock: '',
            categoria: '',
            imagen: null
        }
    });

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

            const formData = new FormData();
            if (data.imagen && data.imagen[0]) {
                formData.append("imagen", data.imagen[0]);
            }
            formData.append("descripcion", data.descripcion);
            formData.append("precio", data.precio);
            formData.append("detalles", data.detalles);
            formData.append("stock", data.stock);
            formData.append("categoria", data.categoria);

            const response = await axiosClient.put(`/productos/${producto.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Server response:", response.data);
            setSuccessMessage("Producto modificado exitosamente");
            queryClient.invalidateQueries(['Productos']);

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
                <ModalContent className="max-h-[100vh]">
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                            <ModalHeader className="flex flex-col gap-1">Modificar Producto</ModalHeader>
                            <ModalBody className="flex-grow overflow-y-auto">
                                {errorMessage && (
                                    <div className="text-red-500 mb-4 p-3 bg-red-100 rounded-lg">
                                        {errorMessage}
                                    </div>
                                )}
                                {successMessage && (
                                    <div className="text-green-500 mb-4 p-3 bg-green-100 rounded-lg">
                                        {successMessage}
                                    </div>
                                )}

                                <div className="space-y-6">
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
                                                selectedKeys={field.value ? [field.value] : []}
                                                onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
                                            >
                                                {categorias?.map((categoria) => (
                                                    <SelectItem key={categoria.id.toString()} value={categoria.id.toString()}>
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
                                                labelPlacement="inside"
                                                placeholder="Ningún archivo seleccionado"
                                                onChange={(e) => field.onChange(e.target.files)}
                                                classNames={{
                                                    base: "w-full",
                                                    mainWrapper: "h-full",
                                                    input: "text-small",
                                                    inputWrapper: "h-full font-normal text-default-500 bg-default-100",
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="border-t">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" type="submit" isLoading={isLoading}>
                                    Modificar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

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