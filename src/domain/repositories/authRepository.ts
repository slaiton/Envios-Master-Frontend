import { User } from "../models/User";

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  register(name: string, email: string, password: string): Promise<User>;
}
