export interface HealthPlan {
  id: number;
  planId: string;
  name: string;
  type: string; // Individual, Family, Senior
  price: string;
  duration: string;
  features: string[];
  status: string; // Active, Inactive
}
export interface Subscription {
  id: number;
  planName: string;
  startDate: string;
  endDate: string;
  status: string; // Active, Expired
  autoRenewal: boolean;
}
