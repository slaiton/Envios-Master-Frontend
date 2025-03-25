import { HomeStatsModel } from "../../domain/models/HomeStatsModel";

export const homeService = {
  fetchStats: async (): Promise<HomeStatsModel[]> => {
    // Simulación de datos
    return [
      { id: '1', title: 'Envios Totales', value: 1500, type: 'number' },
      { id: '2', title: 'Vehiculos Activos', value: 230, type: 'number' },
      { id: '3', title: 'Tasa de Retención', value: 80, type: 'number' },
      { id: '4', title: 'Despachos Mensuales', value: 300, type: 'chart' },
      { id: '9', title: 'Soporte al Cliente', value: 95, type: 'number' }
    ];
  }
};