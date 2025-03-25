import { OrderViewModel } from "../../../domain/models/OrderViewModel";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class GetOrdersUseCase {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  // Obtener todas las órdenes
  async execute(filters: Record<string, any>): Promise<OrderViewModel[]> {
    return this.orderRepository.getOrders(filters);
  }
}