import api from "../../infrastructure/api/axiosInstance";
import { Config } from "../../config/environment";

export interface  Vehicle { id: number; plate: string, capacity:number };


export const getVehicles = async (): Promise<Vehicle[]> => {
    try {
      const token = localStorage.getItem("auth_token"); 
  
      const response = await api.get<Vehicle[]>(Config.API_URL + "api/vehicles/available/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  };