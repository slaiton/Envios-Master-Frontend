import api from "../../infrastructure/api/axiosInstance";
import { Config } from "../../config/environment";


export interface  Drivers { id: number; name: string };

export const getDrivers = async (): Promise<Drivers[]> => {
    try {
      const token = localStorage.getItem("auth_token");
  
      const response = await api.get<Drivers[]>(Config.API_URL + "api/drivers/available/", {
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