import { useNavigate, useParams } from "react-router-dom";
import OrderDispatchComponent from "../../components/orders/OrderDispatch";
import { OrderDispatchModel } from "../../../domain/models/OrderDispatchModel";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/OrderRepositoryImpl";
import { DispatchOrderUseCase } from "../../../application/usecases/orders/DispatchOrderUseCase";




const OrderDispatchPatch = () => {
  const { base64 } = useParams<{ base64: string }>();
  const navigate = useNavigate();


  const orderRepository = new OrderRepositoryImpl();
  const createOrderUseCase = new DispatchOrderUseCase(orderRepository);

  if (!base64) {
    return <div>Loading...</div>;
  }

    const handleCreateOrder = async (order: OrderDispatchModel) => {
      try {
        await createOrderUseCase.execute(order);
        navigate("/order"); 
      } catch (error) {
        console.error("Error al crear la orden:", error);
      }
    };

  return (
    <div>
      {/* <h1>Órdenes</h1> */}
      <OrderDispatchComponent base64={base64} onSubmit={handleCreateOrder} /> 
    </div>
  );
};

export default OrderDispatchPatch;