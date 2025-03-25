import { IndicatorRepository } from "../../../domain/repositories/IndicatorRepository";

export class getHomeStatsUseCase {
  private indicatorRepository: IndicatorRepository;

  constructor(indicatorRepository: IndicatorRepository) {
    this.indicatorRepository = indicatorRepository;
  }

  async execute(): Promise<any> {
    try {
      const response = await this.indicatorRepository.getIndicators();
      return response;
    } catch (error) {
      throw new Error("Error al crear la orden en el caso de uso");
    }
  }
}