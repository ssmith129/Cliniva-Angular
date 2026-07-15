export interface HealthMetric {
  id: number;
  date: string;
  time: string;
  type: string; // BP, Heart Rate, Sugar, Weight, Temp
  value: string;
  unit: string;
  status: string; // Normal, High, Low
  notes?: string;
}
