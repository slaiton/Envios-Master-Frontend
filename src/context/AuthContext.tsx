import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "../../src/application/usecases/authUseCase";
// import { authService } from "../../src/infrastructure/api/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [idClient, setIdClient] = useState<string | null>(null);
  const [idRole, setIdRole] = useState<string | null>(null);

  // Cargar el estado de autenticación al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const clientId = localStorage.getItem("client");
    const idRole = localStorage.getItem("profile");
    setIsAuthenticated(!!token);
    setIdClient(clientId);
    setIdRole(idRole);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await authenticateUser({ email, password }, true);

      if (result.token) {
        localStorage.setItem("auth_token", result.token);
        setIsAuthenticated(true);
      }


      if (result.id_client) {
        localStorage.setItem("client", result.id_client);
        setIdClient(result.id_client);
      }

      if (result.id_rol) {
        localStorage.setItem("profile", result.id_rol);
        setIdRole( result.id_rol);
    
      }


    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};