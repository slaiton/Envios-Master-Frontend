import { Order } from "../entities/Order";
import { OrderDispatchModel } from "../models/OrderDispatchModel";
// import { OrderModel } from "../models/OrderModel";
import { OrderViewModel } from "../models/OrderViewModel";

export interface OrderRepository {
  getOrders(filters:any): Promise<OrderViewModel[]>;
  getOrderById(id: number): Promise<OrderViewModel>;
  createOrder(order: Order): Promise<Order>;
  dispatchOrder(order: any): Promise<OrderDispatchModel>;
  updateOrder(order: Order): Promise<Order>;
  deleteOrder(id: number): Promise<void>;
}