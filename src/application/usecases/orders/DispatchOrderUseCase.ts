import { OrderDispatchModel } from "../../../domain/models/OrderDispatchModel";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class DispatchOrderUseCase {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(order: OrderDispatchModel): Promise<any> {
    try {
      const response = await this.orderRepository.dispatchOrder(order);
      return response;
    } catch (error) {
      throw new Error("Error al crear la orden en el caso de uso");
    }
  }
}