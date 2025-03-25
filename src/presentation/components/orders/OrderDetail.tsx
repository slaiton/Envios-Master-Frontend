import React, { useState } from "react";
import { motion } from "framer-motion";
import { OrderViewModel } from "../../../domain/models/OrderViewModel";

interface OrderDetailComponentProps {
  order: OrderViewModel;
}

const OrderDetailComponent: React.FC<OrderDetailComponentProps> = ({ order }) => {
  const [isTrackingVisible, setIsTrackingVisible] = useState(false);
  // Convertir el campo "detalle" en un JSON válido
  if (typeof order.detail === "string") {
    order.detail = JSON.parse(order.detail);
  }


  if (typeof order.tracking === "string") {
    order.tracking = JSON.parse(order.tracking);
  }


  const toggleTrackingVisibility = () => {
    setIsTrackingVisible(!isTrackingVisible);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">📄 Order Details</h2>

      {/* Tabla Base y Detalles */}
      <div className="grid grid-cols-2 gap-6">
        {/* Datos Base */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">📝 Base Info</h3>
          <table className="min-w-full bg-white">
            <tbody>
              {[
                { label: "Consecutive", value: order.consecutive },
                { label: "Origin", value: order.origin_name },
                { label: "Sender Address", value: order.sender_address },
                { label: "Destination", value: order.destination_name },
                { label: "Receiver Address", value: order.receiver_address },
                { label: "Client", value: order.client_name },
                { label: "Commitment Date", value: order.commitment_date },
                { label: "Status", value: order.status_name },
              ].map((item, index) => (
                <tr
                  key={item.label}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b transition hover:bg-gray-100`}
                >
                  <td className="py-2 px-4 font-semibold text-gray-700">{item.label}:</td>
                  <td className="py-2 px-4 text-gray-900">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detalles */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">📦 Order Details</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Qty</th>
                <th className="py-2 px-4 text-left">Dims (L × W × H)</th>
                <th className="py-2 px-4 text-left">Weight</th>
              </tr>
            </thead>
            <tbody>
              {order.detail.map((detail: any, index: number) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
                  <td className="py-2 px-4">{detail.producto}</td>
                  <td className="py-2 px-4">{detail.cantidad}</td>
                  <td className="py-2 px-4">
                    {detail.largo} × {detail.ancho} × {detail.alto}
                  </td>
                  <td className="py-2 px-4">{detail.peso} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
           {/* Tracking Section */}
           <div className="mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
          onClick={toggleTrackingVisibility}
        >
          {isTrackingVisible ? "Ocultar Tracking" : "Ver Tracking"}
        </button>

        {isTrackingVisible && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">📍 Tracking Info</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {order.tracking.map((track: any, index: number) => (
                  <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
                    <td className="py-2 px-4">{track.date}</td>
                    <td className="py-2 px-4" style={{ color: track.status_color }}>
                      {track.status_name}
                    </td>
                    <td className="py-2 px-4">{track.observation || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderDetailComponent;