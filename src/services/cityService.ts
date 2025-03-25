import api from "../infrastructure/api/axiosInstance";
import { Config } from "../config/environment";


export interface City {
  id: number;
  name: string;
}

export const getCities = async (): Promise<City[]> => {
  try {
    const token = localStorage.getItem("auth_token"); // Obtener el token del localStorage

    const response = await api.get<City[]>(Config.API_URL + "api/cities/", {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token a la cabecera
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};