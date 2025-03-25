import { OrderDetail } from "./OrderDetailModel";

export interface OrderViewModel {
    id: number;
    id_status:number;
    id_client:number;
    consecutive: string;
    commitment_date: string;
    delivery_date: string;
    delivery_time: string;
    origin_name: string;
    destination_name: string;
    origin_departament:string;
    destination_departament:string;  
    plate: string;
    driver_name: string;
    document_driver: string;
    status_name: string;
    client_name: string;
    created_at: string;
    updated_at: string;
    user_created: string;
    sender_name : string;
    sender_document : string;
    sender_celphone : string;
    sender_address : string;
    receiver_name : string;
    receiver_document : string;
    receiver_celphone : string;
    receiver_address : string;
    status_color:string;
    weightSum:string;
    detail: OrderDetail[]
    tracking: []
}