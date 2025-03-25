import React, { useEffect, useState } from "react";
import { OrderViewModel } from "../../../domain/models/OrderViewModel";
import { GetOrdersUseCase } from "../../../application/usecases/orders/GetOrdersUseCase";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/OrderRepositoryImpl";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Autocomplete, TextField } from "@mui/material";
import { getDrivers } from "../../../infrastructure/api/driverService";
import { getVehicles } from "../../../infrastructure/api/vehicleService";
import { STATUS_ARRAY } from "../../../domain/constants/StatusConstants";
import { transformDrivers, transformVehicles } from "../../../utils/transformers";
import { fetchAll } from "../../../services/orderService";


const OrdersList = () => {
  const [vehicles, setVehicles] = useState<{ id: number; label: string }[]>([]);
  const [drivers, setDrivers] = useState<{ id: number; label: string }[]>([]);
  const [orders, setOrders] = useState<OrderViewModel[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    id_client: "",
    consecutive: "",
    id_status: "",
    id_vehicle: "",
    id_driver: "",
    id_origin: "",
    id_destination: "",
  });

  const fetchOrders = async () => {
    setLoading(true);
    fetchData();

    const orderRepository = new OrderRepositoryImpl();
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
    const fetchedOrders = await getOrdersUseCase.execute(filters);
    setOrders(fetchedOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]); // Desmarcar todos
    } else {
      setSelectedOrders(orders.map((order) => order.consecutive)); // Seleccionar todos
    }
  };

  const fetchData = async () => {
    try {
      const { drivers, vehicles } = await fetchAll();
      setDrivers(drivers);
      setVehicles(vehicles);
    } catch (error) {
      // Maneja el error según sea necesario
      console.error(error);
    }
  };

  const handleDispatch = () => {
    if (selectedOrders.length === 0) return;
    const base64Orders = btoa(JSON.stringify(selectedOrders));
    navigate(`/order/dispatch/${base64Orders}`);
  };

  const handleSelectOrder = (id: any) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (event: any, value: any, filterKey: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value ? value : "",
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container overflow-auto mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Lista de Órdenes</h2>

      {/* Filtros de búsqueda */}
      <div className="flex space-x-4 mb-6">
        {/* <Autocomplete
          options={[]} // Aquí puedes poner las opciones para los filtros de autocompletar
          value={filters.id_client}
          onChange={(e, value) => handleFilterChange(e, value, "id_client")}
          renderInput={(params) => <TextField {...params} label="Cliente" />}
        /> */}
        <Autocomplete
          fullWidth
          disablePortal
          options={STATUS_ARRAY}
          getOptionLabel={(option) => option.label}
          getOptionKey={(option) => option.id}
          value={STATUS_ARRAY.find((opt) => opt.id === Number(filters.id_status)) || null}
          onChange={(event, newValue) => {
            // handleFilterChange(event, newValue, "id_client")
            setFilters((prev: any) => ({
              ...prev,
              id_status: newValue ? newValue.id : '',
            })
            )
          }
          }
          renderInput={(params) => <TextField {...params} label="Seleccione estado" />}
        />

        <Autocomplete
          fullWidth
          options={vehicles}
          getOptionLabel={(option) => option.label}
          getOptionKey={(option) => option.id}
          value={vehicles.find((opt) => opt.id === Number(filters.id_vehicle)) || null}
          onChange={(event, newValue: any) => {
            setFilters((prev: any) => ({
              ...prev,
              id_vehicle: newValue ? newValue.id : "",
            })
            )
          }}
          renderInput={(params) => <TextField {...params} label="Vehiculo" />}
        />

        <Autocomplete
          fullWidth
          options={drivers}
          getOptionLabel={(option) => option.label}
          getOptionKey={(option) => option.id}
          value={drivers.find((opt) => opt.id === Number(filters.id_driver)) || null}
          onChange={(event, newValue) => {
            setFilters((prev: any) => ({
              ...prev,
              id_driver: newValue ? newValue.id : "",
            })
            )
          }}
          renderInput={(params) => <TextField {...params} label="Conductor" />}
        />
        {/* Agrega más filtros según sea necesario */}
      </div>

      {/* Tabla de órdenes */}
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedOrders.length === orders.length}
                onChange={handleSelectAll}
                className="cursor-pointer"
              />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Guía</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Origen</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Dirección Origen</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Destino</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Dirección Destino</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Cliente</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vehículo</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Conductor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Fecha de Compromiso</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.consecutive}
              className={`hover:bg-gray-50 transition duration-300 ${selectedOrders.includes(order.consecutive) ? "bg-blue-100" : ""
                }`}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.consecutive)}
                  onChange={() => handleSelectOrder(order.consecutive)}
                  className="cursor-pointer"
                />
              </td>
              <td className="px-6 py-4 text-sm font-medium text-blue-600">
                <a
                  href={`/order/detail/${order.id}`}
                  className="hover:underline"
                >
                  {order.consecutive}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.origin_name}, {order.origin_departament}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.sender_address}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.destination_name}, {order.destination_departament}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.receiver_address}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.client_name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.plate}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.driver_name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.commitment_date}</td>
              <td className="px-6 py-4 text-sm text-gray-600" style={{ backgroundColor: order.status_color }}>
                {order.status_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lista de órdenes seleccionadas */}
      {selectedOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Órdenes seleccionadas:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedOrders.map((id) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                onClick={() => handleSelectOrder(id)}
              >
                {id}
              </motion.button>
            ))}
          </div>

          {/* Botón para despachar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDispatch}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Despachar
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default OrdersList;