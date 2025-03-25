import { Config } from "../../config/environment";


export const authService = {
  authenticate: async (data: any, isLogin: boolean) => {
    const endpoint = isLogin ? "api/auth/login" : "api/auth/register";

    try {
      const response = await fetch(Config.API_URL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error en la autenticación");
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getToken: () => {
    return localStorage.getItem("auth_token");
  },

  removeToken: () => {
    localStorage.removeItem("auth_token");
  },
 setClient: (clientId:any) => {
    localStorage.setItem("client", clientId);
  }
};