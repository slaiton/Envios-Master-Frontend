import axios from "axios";
import { logout } from "../../services/authService";
import { Config } from "../../config/environment";


const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      alert("Sesión expirada. Por favor, vuelve a iniciar sesión.");
    }
    if (error.response) {
      switch (error.response.status) {
        case 400:
          alert("Solicitud incorrecta. Por favor, revisa los datos ingresados.");
          break;
        case 404:
          alert("Recurso no encontrado. Intenta nuevamente.");
          break;
        case 500:
          alert("Error en el servidor. Intenta más tarde.");
          break;
        default:
          alert("Ocurrió un error desconocido. Intenta nuevamente.");
          break;
      }
    } else if (error.request) {
      alert("No se pudo conectar con el servidor. Intenta nuevamente.");
    } else {
      console.error("Error al hacer la solicitud:", error.message);
      alert("Error desconocido. Intenta nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default api;