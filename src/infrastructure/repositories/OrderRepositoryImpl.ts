import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { OrderModel } from "../../domain/models/OrderModel";
import { OrderViewModel } from "../../domain/models/OrderViewModel";
import { getOrders, getOrderById, submitOrder, updateOrder, deleteOrder, dispatchOrder } from "../api/orderService"; 
import { OrderDispatchModel } from "../../domain/models/OrderDispatchModel";


export class OrderRepositoryImpl implements OrderRepository {
  async getOrders(filters: Record<string, any>): Promise<OrderViewModel[]> {
    try {
      const response = await getOrders(filters);
      return response;
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      throw error; 
    }
  }

  async getOrderById(id: number): Promise<OrderViewModel> {
    try {
      const response = await getOrderById(id);
      return response;
    } catch (error) {
      console.error("Error al obtener la orden por ID:", error);
      throw error;
    }
  }

  async createOrder(order: OrderModel): Promise<OrderModel> {
    try {
      const response = await submitOrder(order); 
      return response;
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw error;
    }
  }

  async updateOrder(order: OrderModel): Promise<OrderModel> {
    try {
      const response = await updateOrder(order);
      return response;
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      throw error;
    }
  }

  async dispatchOrder(order: OrderDispatchModel): Promise<OrderDispatchModel> {
    try {
      const response = await dispatchOrder(order);
      return response;
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      throw error;
    }
  }


  async deleteOrder(id: number): Promise<void> {
    try {
      await deleteOrder(id);
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      throw error;
    }
  }
}