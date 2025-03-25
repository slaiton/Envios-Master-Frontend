import api from "../../infrastructure/api/axiosInstance";
import { Config } from "../../config/environment";


export const getIndicators = async (): Promise<any> => {
    try {
      const token = localStorage.getItem("auth_token");
  
      const response = await api.get<any>(Config.API_URL + "api/indicators/", {
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