export interface EmergencyRequest {
  id: number;
  requestId: string;
  type: string; // Ambulance, Doctor
  date: string;
  time: string;
  status: string; // Pending, Dispatched, Resolved
  location: string;
}
