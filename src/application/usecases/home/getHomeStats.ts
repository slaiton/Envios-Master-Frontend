import { HomeStatsModel } from "../../../domain/models/HomeStatsModel";
import { homeService } from "../../../infrastructure/api/homeService";

export const getHomeStats = async (): Promise<HomeStatsModel[]> => {
  const stats = await homeService.fetchStats();
  return stats;
};