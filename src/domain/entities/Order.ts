import { Dayjs } from "dayjs";

export interface Order {
    id?: number;
    consecutive: string;
    id_origin: number;
    id_destination: number;
    id_client: number;
    commitment_date: Dayjs;
  }