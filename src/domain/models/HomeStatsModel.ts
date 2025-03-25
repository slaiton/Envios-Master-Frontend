export interface HomeStatsModel {
    id: string;
    title: string;
    value: string | number;
    type: 'number' | 'chart';
  }