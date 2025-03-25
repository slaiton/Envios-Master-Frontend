import { OrderRepositoryImpl } from '../../../infrastructure/repositories/OrderRepositoryImpl';
// import { Order } from '../../../domain/entities/Order';
import { OrderViewModel } from '../../../domain/models/OrderViewModel';

export class GetOrderDetailUseCase {
  constructor(private orderRepository: OrderRepositoryImpl) {}

  async execute(id: number): Promise<OrderViewModel | null> {
    return this.orderRepository.getOrderById(id);
  }
}