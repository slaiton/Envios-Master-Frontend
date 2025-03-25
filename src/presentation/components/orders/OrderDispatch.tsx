import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Autocomplete, Button, LinearProgress, TextField } from "@mui/material";
import { OrderViewModel } from "../../../domain/models/OrderViewModel";
import { GetOrdersUseCase } from "../../../application/usecases/orders/GetOrdersUseCase";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/OrderRepositoryImpl";
import { getDrivers } from "../../../infrastructure/api/driverService";
import { getVehicles } from "../../../infrastructure/api/vehicleService";
import { OrderDispatchModel } from "../../../domain/models/OrderDispatchModel";
import { STATUS_ARRAY } from "../../../domain/constants/StatusConstants";



interface OrderDispatchComponentrProps {
    base64: any;
     onSubmit: (order: OrderDispatchModel) => void;
}


type Vehicles = { id: number; plate: string, capacity: number };
type TransformedVehicles = { id: number; label: string };

const transformVehicles = (vehicles: Vehicles[]): TransformedVehicles[] => {
    return vehicles.map(({ id, plate, capacity }) => ({
        id: id,
        label: plate,
        capacity: capacity
    }));
};


type Drivers = { id: number; name: string };
type TransformedDrivers = { id: number; label: string };

const transformDrivers = (drivers: Drivers[]): TransformedDrivers[] => {
    return drivers.map(({ id, name }) => ({
        id: id,
        label: name,
    }));
};


const OrderDispatchComponent: React.FC<OrderDispatchComponentrProps> = ({ base64, onSubmit }: OrderDispatchComponentrProps) => {
    const decodedJson = JSON.parse(decodeURIComponent(escape(atob(base64))));
    const [vehicles, setVehicles] = useState<{ id: number; label: string }[]>([]);
    const [drivers, setDrivers] = useState<{ id: number; label: string }[]>([]);

    const [orders, setOrders] = useState<OrderViewModel[]>([]);
    const [progress, setProgress] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalWeight, setTotalWeight] = useState(0);
    const [selectedVehicle, setSelectedVehicle] = useState<TransformedVehicles | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<TransformedDrivers | null>(null);
    const [status, setStatus] = useState(null);
    const [observation, setObservation] = useState("");

    const [formData, setFormData] = useState({
        id_vehicle: 0,
        id_driver: 0,
        id_status: 2,
        orders: decodedJson
    });

    const handleCapacity = (capacity: number) => {
        const totalWeightBar = (totalWeight * 100) / capacity
        setProgress(totalWeightBar)
        setCapacity(capacity)
    }


    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);

            const drivers = await getDrivers();
            const vehicles = await getVehicles();

            setDrivers(transformDrivers(drivers))
            setVehicles(transformVehicles(vehicles))

            try {
                let accumulatedWeight = 0; // Variable para sumar los pesos

                for (let i = 0; i < decodedJson.length; i++) {
                    const consecutive = decodedJson[i];
                    const filters = {consecutive: consecutive};
                    const orderRepository = new OrderRepositoryImpl();
                    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
                    const fetchedOrders = await getOrdersUseCase.execute(filters);

                    // Procesar cada orden para sumar los pesos
                    fetchedOrders.forEach((order: any) => {
                        if (order.detail) {
                            try {
                                const details = JSON.parse(order.detail);
                                const weightSum = details.reduce((sum: number, item: any) => sum + (item.peso || 0), 0);
                                order.weightSum = weightSum;
                                accumulatedWeight += weightSum;
                            } catch (error) {
                                console.error("Error parsing detail:", error);
                            }
                        }
                    });

                    setOrders((prevOrders) => [...prevOrders, ...fetchedOrders]);
                }

                setTotalWeight(accumulatedWeight);
                console.log(accumulatedWeight);

            } catch (error) {
                console.error("Error al obtener órdenes", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [base64]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          setLoading(true);
          console.log(formData);
          
          onSubmit(formData); 
        } catch (error) {
          console.error("Error al enviar el pedido:", error);
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="w-3/4 mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Despacho de Orden</h2>

                {/* Formulario */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        {/* <label className="block text-gray-700 font-medium">Vehículo</label> */}
                        <Autocomplete
                            fullWidth
                            options={vehicles}
                            getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id}
                            value={vehicles.find((opt) => opt.id === formData.id_vehicle) || null}
                            onChange={(event, newValue: any) => {
                                handleCapacity(newValue.capacity)
                                setFormData((prev: any) => ({
                                    ...prev,
                                    id_vehicle: newValue ? newValue.id : null,
                                })
                                )
                            }}
                            renderInput={(params) => <TextField {...params} label="Vehiculo" />}
                        />
                    </div>
                    <div>
                        {/* <label className="block text-gray-700 font-medium">Conductor</label> */}
                        <Autocomplete
                            fullWidth
                            options={drivers}
                            getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id}
                            value={drivers.find((opt) => opt.id === formData.id_driver) || null}
                            onChange={(event, newValue) => {
                                setFormData((prev: any) => ({
                                    ...prev,
                                    id_driver: newValue ? newValue.id : null,
                                })
                                )
                            }}
                            renderInput={(params) => <TextField {...params} label="Conductor" />}
                        />
                    </div>
                </div>

                {/* Barra de Progreso */}
                <div className="mb-4">
                    <LinearProgress variant="determinate" value={progress} />
                    <div className="text-center mt-2 text-gray-700 font-medium">
                        Total Capacidad: {capacity}kg
                    </div>
                </div>

                {/* Tabla de órdenes */}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
                    </div>
                ) : (
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600">Consecutivo</th>
                                <th className="px-4 py-2 text-left text-gray-600">Cliente</th>
                                <th className="px-4 py-2 text-left text-gray-600">Origen</th>
                                <th className="px-4 py-2 text-left text-gray-600">Destino</th>
                                <th className="px-4 py-2 text-left text-gray-600">Total Peso</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((orderItem) => (
                                <tr key={orderItem.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{orderItem.consecutive}</td>
                                    <td className="px-4 py-2">{orderItem.client_name}</td>
                                    <td className="px-4 py-2">{orderItem.origin_name}</td>
                                    <td className="px-4 py-2">{orderItem.destination_name}</td>
                                    <td className="px-4 py-2 text-blue-600 font-semibold">{orderItem.weightSum} Kg</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="w-3/4 mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <Autocomplete
                            fullWidth
                            disablePortal
                            options={STATUS_ARRAY}
                            getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id}
                            value={STATUS_ARRAY.find((opt) => opt.id === formData.id_status) || null}
                            onChange={(event, newValue) => {
                                setFormData((prev: any) => ({
                                    ...prev,
                                    id_status: newValue ? newValue.id : null,
                                })
                                )
                            }
                            }
                            renderInput={(params) => <TextField {...params} label="Seleccione estado" />}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Observación</label>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Ingrese una observación..."
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="grid grid-cols-2 gap-4">
                    {/* <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Enviar
                </Button> */}
                    <Button variant="contained" color="secondary" fullWidth onClick={handleSubmit}>
                        Guardar
                    </Button>
                </div>
            </div>

        </div>

    );
};

export default OrderDispatchComponent;