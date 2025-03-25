import { authService } from "../../infrastructure/api/authService";

export const authenticateUser = async (data: any, isLogin: boolean) => {
  return await authService.authenticate(data, isLogin);
};