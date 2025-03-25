import { PersonModel } from "./SenderReceiverModel";
import { OrderDetail } from "./OrderDetailModel";
import { Dayjs } from 'dayjs';

export interface OrderModel {
  id:number;
  consecutive: string;
  id_origin: number;
  id_destination: number;
  id_client: number;
  commitment_date: Dayjs;
  delivery_date: string;
  delivery_time: string;
  sender: PersonModel;
  receiver: PersonModel;
  detail: OrderDetail[];
}