import React, { useEffect, useState } from "react";
import { OrderModel } from "../../../domain/models/OrderModel";
import { motion } from "framer-motion";
import { getCities } from "../../../services/cityService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CreateOrderUseCase } from "../../../application/usecases/orders/CreateOrderUseCase";
import {
    TextField,
    Button,
    Grid,
    Autocomplete,
    Paper,
    Typography,
    Select,
} from "@mui/material";
import dayjs from "dayjs";


interface OrderFormProps {
    createOrderUseCase: CreateOrderUseCase; // Inyectamos el caso de uso
    onSubmit: (order: OrderModel) => void;
  }

const streetTypes = [{ id: "Avenida", label: "Avenida" }, { id: "Carrera", label: "Carrera" }, { id: "Calle", label: "Calle" }, { id: "Transversal", label: "Transversal" }, { id: "Diagonal", label: "Diagonal" }];
const orientation = [{ id: "Este", label: "Este" }, { id: "Sur", label: "Sur" }]

type City = { id: number; name: string };
type TransformedCity = { id: number; label: string };

const transformCities = (cities: City[]): TransformedCity[] => {
    return cities.map(({ id, name }) => ({
        id: id,
        label: name,
    }));
};



const OrderForm = ({createOrderUseCase, onSubmit }: OrderFormProps) => {
    const [cities, setCities] = useState<{ id: number; label: string }[]>([]);
    const [step, setStep] = useState(1);
    const [selectedCity, setSelectedCity] = useState<TransformedCity | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = useState<OrderModel>({
        id: 0,
        consecutive: "",
        id_origin: 0,
        id_destination: 0,
        id_client: Number(localStorage.getItem('client')),
        commitment_date: dayjs(),
        delivery_date: "",
        delivery_time: "",
        sender: {
            name: "",
            document: "",
            celphone: "",
            address: "",
            id_city: 0,
            streetType: "",
            orientation: "",
            streetNumber: "",
            neighborhood: "",
            reference: "",
        },
        receiver: {
            name: "",
            document: "",
            celphone: "",
            address: "",
            id_city: 0,
            streetType: "",
            orientation: "",
            streetNumber: "",
            neighborhood: "",
            reference: "",
        },
        detail: [],
    });
    

    const isFormComplete = () => {
        const { sender, receiver, commitment_date, delivery_date, delivery_time } = formData;
        return (
            sender.name &&
            sender.document &&
            sender.celphone &&
            sender.address &&
            sender.id_city &&
            receiver.name &&
            receiver.document &&
            receiver.celphone &&
            receiver.address &&
            receiver.id_city &&
            commitment_date
        );
    };

    const updateAddress = (section: "sender" | "receiver") => {
        setFormData((prev) => {
            const streetType = prev[section].streetType;
            const streetNumber = prev[section].streetNumber;
            const neighborhood = prev[section].neighborhood;
            const reference = prev[section].reference;
            const orientation = prev[section].orientation;
            
            console.log(streetType)
            console.log(streetNumber)
            console.log(neighborhood)
            console.log(reference)
            // Unificamos los campos de dirección en el campo "address"
            const address = `${streetType} ${streetNumber} # ${reference} ${orientation} - ${neighborhood}`;

            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    address: address.trim(), // Eliminar espacios en blanco extra
                },
            };
        });
    };


    useEffect(() => {
        const fetchCities = async () => {
            console.log(Number(localStorage.getItem('client')));
            
            const data = await getCities();
            // console.log(transformCities(data));

            setCities(transformCities(data));
        };
        fetchCities();
    }, []);


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        section: "sender" | "receiver"
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        })

        );

        if (name === "streetType" || name === "streetNumber" || name === "neighborhood" || name === "reference") {
            console.log(section);

            updateAddress(section);
        }

    };


    const handleCityChange = (selectedOption: TransformedCity | null) => {
        setSelectedCity(selectedOption);
        console.log("Ciudad seleccionada:", selectedOption);
    };
    //   const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, section: "sender" | "receiver") => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //       ...prev,
    //       [section]: {
    //         ...prev[section],
    //         [name]: value,
    //       },
    //     }));
    //   };

    //   const handleAddRow = () => {
    //     setFormData((prev) => ({
    //       ...prev,
    //       detalle: [...prev.detalle, { product: "", weight: 0, height: 0, length: 0, width: 0, quantity: 1 }],
    //     }));
    //   };

    //   const handleRemoveRow = (index: number) => {
    //     setFormData((prev) => ({
    //       ...prev,
    //       detalle: prev.detalle.filter((_, i) => i !== index),
    //     }));
    //   };


    //   const handleDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => {
    //       const newDetalle = [...prev.detalle];
    //       newDetalle[index] = { ...newDetalle[index], [name]: value };
    //       return { ...prev, detalle: newDetalle };
    //     });
    //   };

    const handleCargoChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updatedCargo = [...prev.detail];
            updatedCargo[index] = { ...updatedCargo[index], [name]: value };
            return { ...prev, detail: updatedCargo };
        });
    };

    const handleAddCargo = () => {
        setFormData((prev) => ({
            ...prev,
            detail: [...prev.detail, { product: "", weight: 0, height: 0, length: 0, width: 0, quantity: 1 }],
        }));
    };

    // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         commitment_date: e.target.value,  // Actualizamos la fecha seleccionada
    //     });
    // };

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          setLoading(true);
        //   const response = await createOrderUseCase.execute(formData);
        //   console.log("Pedido enviado:", response);
          onSubmit(formData);  // Llamar a la función onSubmit después de enviar el pedido
        } catch (error) {
          console.error("Error al enviar el pedido:", error);
        } finally {
          setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5" gutterBottom>
                {step === 1 ? "Información de Origen" : step === 2 ? "Información de Destino" : "Información de la Carga"}
            </Typography>
            <form onSubmit={handleSubmit}>
                {step < 3 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Nombre"
                                name="name"
                                fullWidth
                                value={formData[step === 1 ? "sender" : "receiver"].name}
                                onChange={(e) => handleChange(e, step === 1 ? "sender" : "receiver")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Documento"
                                name="document"
                                fullWidth
                                value={formData[step === 1 ? "sender" : "receiver"].document}
                                onChange={(e) => handleChange(e, step === 1 ? "sender" : "receiver")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Celular"
                                name="celphone"
                                fullWidth
                                value={formData[step === 1 ? "sender" : "receiver"].celphone}
                                onChange={(e) => handleChange(e, step === 1 ? "sender" : "receiver")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {step === 1 ? (

                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    options={cities}
                                    getOptionLabel={(option) => option.label}
                                    getOptionKey={(option) => option.id}
                                    value={cities.find((opt) => opt.id === formData.sender.id_city) || null}
                                    onChange={(event, newValue) => {
                                        console.log(event);
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            id_origin: newValue ? newValue.id : null,
                                            sender: {
                                                ...prev.sender,
                                                id_city: newValue ? newValue.id : prev.sender.id_city
                                            },
                                        }));
                                        console.log(formData);
                                        
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Ciudad de Origen" />}
                                />
                            ) : (
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    options={cities}
                                    getOptionLabel={(option) => option.label}
                                    getOptionKey={(option) => option.id}
                                    value={cities.find((opt) => opt.id === formData.receiver.id_city) || null}
                                    onChange={(event, newValue) => {
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            id_destination: newValue ? newValue.id : null,
                                            receiver: {
                                                ...prev.receiver,
                                                id_city: newValue ? newValue.id : prev.receiver.id_city
                                            },
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Ciudad de Destino" />}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Direccion
                            </Typography>
                            <Grid container xs={12}>
                                <Grid item xs={4}>
                                    {step === 1 ? (
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            options={streetTypes}
                                            getOptionLabel={(option) => option.label}
                                            getOptionKey={(option) => String(option.id)}
                                            value={streetTypes.find((opt) => opt.id === formData.sender.streetType) || null}
                                            onChange={(event, newValue) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    sender: {
                                                        ...prev.sender,
                                                        streetType: newValue ? newValue.id : null,
                                                    },
                                                }));
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Calle" />}
                                        />
                                    ) : (
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            options={streetTypes}
                                            getOptionLabel={(option) => option.label}
                                            getOptionKey={(option) => String(option.id)}
                                            value={streetTypes.find((opt) => opt.id === formData.receiver.streetType) || null}
                                            onChange={(event, newValue) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    receiver: {
                                                        ...prev.receiver,
                                                        streetType: newValue ? newValue.id : null,
                                                    },
                                                }));
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Calle" />}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Número" name="streetNumber" fullWidth value={formData[step === 1 ? "sender" : "receiver"].streetNumber}
                                        onChange={(e) => {
                                            console.log(e.target.value);  // Agregar console.log para depurar
                                            handleChange(e, step === 1 ? "sender" : "receiver");
                                        }} />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h6" gutterBottom align="center">
                                        #
                                    </Typography>
                                </Grid>


                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Grid container xs={12}>

                                <Grid item xs={4}>
                                    <TextField label="Referencia" name="reference" fullWidth value={formData[step === 1 ? "sender" : "receiver"].reference} onChange={(e) => handleChange(e, step === 1 ? "sender" : "receiver")} />
                                </Grid>

                                <Grid item xs={4}>
                                    {step === 1 ? (
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            options={orientation}
                                            getOptionLabel={(option) => option.label}
                                            getOptionKey={(option) => String(option.id)}
                                            value={orientation.find((opt) => opt.id === formData.sender.orientation) || null}
                                            onChange={(event, newValue) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    sender: {
                                                        ...prev.sender,
                                                        orientation: newValue ? newValue.id : null,
                                                    },
                                                }));
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Orientacion" />}
                                        />
                                    ) : (
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            options={orientation}
                                            getOptionLabel={(option) => option.label}
                                            getOptionKey={(option) => String(option.id)}
                                            value={orientation.find((opt) => opt.id === formData.receiver.orientation) || null}
                                            onChange={(event, newValue) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    receiver: {
                                                        ...prev.receiver,
                                                        orientation: newValue ? newValue.id : null,
                                                    },
                                                }));
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Orientacion" />}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Barrio" name="neighborhood" fullWidth value={formData[step === 1 ? "sender" : "receiver"].neighborhood} onChange={(e) => handleChange(e, step === 1 ? "sender" : "receiver")} />
                                </Grid>
                            </Grid>

                        </Grid>



                    </Grid>
                ) : (
                    <>
                        <div>

                            {formData.detail.map((item, index) => (
                                <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Producto"
                                            name="product"
                                            value={item.product}
                                            onChange={(e) => handleCargoChange(index, e)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Peso"
                                            name="weight"
                                            type="number"
                                            value={item.weight}
                                            onChange={(e) => handleCargoChange(index, e)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Alto"
                                            name="height"
                                            type="number"
                                            value={item.height}
                                            onChange={(e) => handleCargoChange(index, e)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Largo"
                                            name="length"
                                            type="number"
                                            value={item.length}
                                            onChange={(e) => handleCargoChange(index, e)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Ancho"
                                            name="width"
                                            type="number"
                                            value={item.width}
                                            onChange={(e) => handleCargoChange(index, e)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Cantidad"
                                            name="quantity"
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleCargoChange(index, e)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleAddCargo}
                                sx={{ mt: 2 }}
                            >
                                Agregar Producto
                            </Button>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Fecha Entrega
                                    </Typography>
                                    <Grid item xs={6}>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                            name="commitment_date"
                                            value={formData.commitment_date}
                                             />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </div>
                    </>

                )}



                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {step > 1 && (
                        <Grid item xs={6}>
                            <Button variant="outlined" fullWidth onClick={handlePrev}>Anterior</Button>
                        </Grid>
                    )}
                    {step < 3 ? (
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth onClick={handleNext}>Siguiente</Button>
                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <Button variant="contained" type="submit" disabled={!isFormComplete()} fullWidth>Enviar</Button>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Paper>
    );

};

export default OrderForm;
