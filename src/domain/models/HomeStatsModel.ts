export interface HomeStatsModel {
    id: string;
    title: string;
    value: string | number;
    type: 'number' | 'chart';  // Puede ser un número o un gráfico
  }