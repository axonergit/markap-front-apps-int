import { useForm, Controller } from "react-hook-form";
import { Input, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../config/axiosClient.js";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CrearProducto = () => {
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

    // Fetch categories
    const { data: categorias } = useQuery({
        queryKey: ['Categorias'],
        queryFn: () => axiosClient.get("/productos/categoria").then((res) => res.data),
    });

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

            await axiosClient.post("/productos", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setSuccessMessage("Producto creado exitosamente");
            queryClient.invalidateQueries(['Productos']);
            reset();
            setTimeout(() => {
                setIsOpen(false);
                setSuccessMessage(null);
            }, 2000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error al crear el producto");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button color="primary" onPress={() => setIsOpen(true)}>
                Crear Producto
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    reset();
                    setSuccessMessage(null);
                    setErrorMessage(null);
                }}
                size="3xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">Nuevo Producto</ModalHeader>
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
                                rules={{ required: "La imagen es obligatoria" }}
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        label="Imagen"
                                        onChange={(e) => field.onChange(e.target.files)}
                                        isInvalid={!!errors.imagen}
                                        errorMessage={errors.imagen?.message}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                                Cerrar
                            </Button>
                            <Button color="primary" type="submit" isLoading={isLoading}>
                                Crear
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CrearProducto;