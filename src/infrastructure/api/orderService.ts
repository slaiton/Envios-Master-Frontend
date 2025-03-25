import api from "../../infrastructure/api/axiosInstance";
import { OrderModel } from "../../domain/models/OrderModel";
import { OrderViewModel } from "../../domain/models/OrderViewModel";
import { OrderDispatchModel } from "../../domain/models/OrderDispatchModel";

const API_URL = "api/order/"; 


export const submitOrder = async (order: OrderModel) => {
  try {
    const response = await api.post(API_URL, order);  
    return response.data; 
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    throw error;  
  }
};
export const getOrders = async (filters: { [key: string]: any }): Promise<OrderViewModel[]> => {
  try {
    const queryParams = new URLSearchParams(filters).toString();

    const response = await api.get(`/api/order?${queryParams}`);
    
    return response.data;
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw new Error("No se pudieron obtener las órdenes. Intente nuevamente.");
  }
};

export const dispatchOrder = async (order: OrderDispatchModel) => {
  try {
    const response = await api.post(API_URL + 'dispatch', order);  
    return response.data; 
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    throw error;  
  }
};

export const getOrderById = async (id: number): Promise<OrderViewModel> => {
  try {
    const response = await api.get(`${API_URL + id}`);
    return response.data || null;
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw error;
  }
};

export const updateOrder = async (order: OrderModel): Promise<OrderModel> => {
  try {
    const response = await api.put(`${API_URL}/${order.id}`, order);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    throw error;
  }
};

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    throw error;
  }
};