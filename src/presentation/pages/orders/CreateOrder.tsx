import { useNavigate } from "react-router-dom";
import OrderForm from "../../components/orders/OrdersForm";
import { OrderModel } from "../../../domain/models/OrderModel";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/OrderRepositoryImpl";
import { CreateOrderUseCase } from "../../../application/usecases/orders/CreateOrderUseCase";

const CreateOrder = () => {
  const navigate = useNavigate();

  const orderRepository = new OrderRepositoryImpl();
  const createOrderUseCase = new CreateOrderUseCase(orderRepository);

  const handleCreateOrder = async (order: OrderModel) => {
    try {
      await createOrderUseCase.execute(order);
      navigate("/order"); 
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className="w-screen h-screen mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Orden</h2>
      <OrderForm createOrderUseCase={createOrderUseCase}  onSubmit={handleCreateOrder} />
    </div>
  );
};

export default CreateOrder;