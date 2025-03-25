import { OrderModel } from "../../../domain/models/OrderModel";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class CreateOrderUseCase {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(order: OrderModel): Promise<any> {
    try {
      // Delegamos la creación de la orden al repositorio
      const response = await this.orderRepository.createOrder(order);
      return response;
    } catch (error) {
      throw new Error("Error al crear la orden en el caso de uso");
    }
  }
}