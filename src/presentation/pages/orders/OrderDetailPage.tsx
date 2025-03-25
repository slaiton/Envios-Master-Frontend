import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderViewModel } from "../../../domain/models/OrderViewModel";
import { GetOrderDetailUseCase } from "../../../application/usecases/orders/GetOrderDetailUseCase";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/OrderRepositoryImpl";
import OrderDetailComponent from "../../components/orders/OrderDetail";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderViewModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getOrderDetailUseCase = new GetOrderDetailUseCase(new OrderRepositoryImpl());

  useEffect(() => {
    if (!id) {
      setError("Invalid order ID");
      return;
    }

    const fetchOrderDetail = async () => {
      try {
        const fetchedOrder = await getOrderDetailUseCase.execute(Number(id));
        setOrder(fetchedOrder);
      } catch (err) {
        setError("Error fetching order details");
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return <OrderDetailComponent order={order} />;
};

export default OrderDetailPage;