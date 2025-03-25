import { IndicatorRepository } from "../../domain/repositories/IndicatorRepository";
import { getIndicators } from "../api/indicatorService";

export class IndicatorRepositoryImpl implements IndicatorRepository {
  async getIndicators(): Promise<any> {
    try {
      const response = await getIndicators();
      return response;
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      throw error; 
    }
  }
}